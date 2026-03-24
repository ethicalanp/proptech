"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export type VerificationLevel = 1 | 2 | 3 | 4;
export type ProfileRole = 'owner' | 'agent' | 'builder';

export interface UserProfile {
  role: ProfileRole;
  // Shared
  name: string;
  email: string;
  phone: string;
  city: string;
  profilePhoto: string;
  
  // Owner
  propertyProofVerified: boolean;

  // Agent
  agencyName: string;
  officeAddress: string;
  licenseRera: string;
  agencyProofVerified: boolean;

  // Builder
  companyName: string;
  website: string;
  gstNumber: string;
  companyProofVerified: boolean;
  reraVerified: boolean;

  // Shared Verifications & Legacy Status
  phoneVerified: boolean;
  idVerified: boolean;
  level: VerificationLevel;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
}

const defaultUserProfile: UserProfile = {
  role: 'owner',
  name: "",
  email: "",
  phone: "",
  city: "",
  profilePhoto: "",
  propertyProofVerified: false,
  agencyName: "",
  officeAddress: "",
  licenseRera: "",
  agencyProofVerified: false,
  companyName: "",
  website: "",
  gstNumber: "",
  companyProofVerified: false,
  reraVerified: false,
  phoneVerified: false,
  idVerified: false,
  level: 1,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userProfile: defaultUserProfile,
  updateUserProfile: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Load user profile from local storage tied to UID
        const savedProfile = localStorage.getItem(`profile_${currentUser.uid}`);
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile));
        } else {
          setUserProfile(defaultUserProfile);
        }
      } else {
        setUserProfile(defaultUserProfile);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const newProfile = { ...prev, ...updates };
      // Calculate new level dynamically
      let newLevel: VerificationLevel = 1;

      if (newProfile.role === 'owner') {
        if (newProfile.phoneVerified) newLevel = 2;
        if (newProfile.phoneVerified && (newProfile.idVerified || newProfile.propertyProofVerified)) newLevel = 3;
      } else if (newProfile.role === 'agent') {
        if (newProfile.phoneVerified) newLevel = 2;
        if (newProfile.phoneVerified && newProfile.idVerified) newLevel = 3;
        if (newProfile.phoneVerified && newProfile.agencyProofVerified) newLevel = 4;
      } else if (newProfile.role === 'builder') {
        if (newProfile.phoneVerified) newLevel = 2;
        if (newProfile.phoneVerified && (newProfile.companyProofVerified || newProfile.reraVerified)) newLevel = 4;
      }

      newProfile.level = newLevel;

      if (user) {
        localStorage.setItem(`profile_${user.uid}`, JSON.stringify(newProfile));
      }
      return newProfile;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, userProfile, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
