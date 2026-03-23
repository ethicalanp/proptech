"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export type VerificationLevel = 1 | 2 | 3 | 4;

export interface TrustProfile {
  level: VerificationLevel;
  phoneVerified: boolean;
  idVerified: boolean;
  licenseVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  trustProfile: TrustProfile;
  updateTrustProfile: (updates: Partial<TrustProfile>) => void;
}

const defaultTrustProfile: TrustProfile = {
  level: 1,
  phoneVerified: false,
  idVerified: false,
  licenseVerified: false,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  trustProfile: defaultTrustProfile,
  updateTrustProfile: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [trustProfile, setTrustProfile] = useState<TrustProfile>(defaultTrustProfile);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Load trust profile from local storage tied to UID
        const savedProfile = localStorage.getItem(`trust_${currentUser.uid}`);
        if (savedProfile) {
          setTrustProfile(JSON.parse(savedProfile));
        } else {
          setTrustProfile(defaultTrustProfile);
        }
      } else {
        setTrustProfile(defaultTrustProfile);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateTrustProfile = (updates: Partial<TrustProfile>) => {
    setTrustProfile((prev) => {
      const newProfile = { ...prev, ...updates };
      // Calculate new level
      let newLevel: VerificationLevel = 1;
      if (newProfile.licenseVerified) newLevel = 4;
      else if (newProfile.idVerified) newLevel = 3;
      else if (newProfile.phoneVerified) newLevel = 2; // Assume email is verified by Auth

      newProfile.level = newLevel;

      if (user) {
        localStorage.setItem(`trust_${user.uid}`, JSON.stringify(newProfile));
      }
      return newProfile;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, trustProfile, updateTrustProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
