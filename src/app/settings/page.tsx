"use client";

import { useAuth, VerificationLevel } from "@/context/AuthContext";
import { CheckCircle2, Circle, ShieldCheck, Mail, Phone, IdCard, Building, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { user, trustProfile, updateTrustProfile } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 flex flex-col items-center justify-center px-6">
        <ShieldCheck size={64} className="text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">You must be logged in to view your account settings and verification profile.</p>
        <Link href="/login" className="bg-[#408A71] text-white px-8 py-3 rounded-full font-bold hover:bg-[#34745c] transition-colors">
          Go to Login
        </Link>
      </div>
    );
  }

  const levelDescriptions = {
    1: "Normal User (Browse & Contact Only)",
    2: "Basic Verified (Limited Listings)",
    3: "ID Verified (Unlimited Listings)",
    4: "Agent Verified (Unlimited + Trusted Badge)"
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 text-left">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Account Settings</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="text-[#408A71]" size={28} />
              Trust & Verification
            </h2>
          </div>
          <p className="text-gray-500 mb-8">
            Level up your account to unlock publishing capabilities and build trust in the community.
          </p>

          {/* Current Level UI */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Your Current Status</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-[#408A71]">Level {trustProfile.level}</span>
                <span className="bg-[#408A71]/10 text-[#408A71] text-sm font-bold px-3 py-1 rounded-full">
                  {levelDescriptions[trustProfile.level]}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="space-y-4">
            {/* Phone */}
            <div className={`flex items-center justify-between p-5 rounded-xl border ${trustProfile.phoneVerified ? 'bg-green-50/50 border-green-100' : 'bg-white border-gray-100 shadow-sm'}`}>
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  {trustProfile.phoneVerified ? <CheckCircle2 className="text-green-500" size={24} /> : <Circle className="text-gray-300" size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Phone size={18} className="text-gray-400"/> Phone Verification
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Required to post up to 2 properties (Level 2).</p>
                </div>
              </div>
              {!trustProfile.phoneVerified && (
                <button onClick={() => updateTrustProfile({ phoneVerified: true })} className="shrink-0 bg-gray-900 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Verify Phone
                </button>
              )}
            </div>

            {/* ID */}
            <div className={`flex items-center justify-between p-5 rounded-xl border ${trustProfile.idVerified ? 'bg-green-50/50 border-green-100' : 'bg-white border-gray-100 shadow-sm'} ${!trustProfile.phoneVerified && 'opacity-60 grayscale'}`}>
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  {trustProfile.idVerified ? <CheckCircle2 className="text-green-500" size={24} /> : <Circle className="text-gray-300" size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <IdCard size={18} className="text-gray-400"/> Government ID
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Upload ID to post unlimited properties (Level 3).</p>
                </div>
              </div>
              {!trustProfile.idVerified && (
                <button 
                  disabled={!trustProfile.phoneVerified}
                  onClick={() => updateTrustProfile({ idVerified: true })} 
                  className="shrink-0 bg-gray-900 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload ID
                </button>
              )}
            </div>

            {/* Agent License */}
            <div className={`flex items-center justify-between p-5 rounded-xl border ${trustProfile.licenseVerified ? 'bg-green-50/50 border-green-100' : 'bg-white border-gray-100 shadow-sm'} ${!trustProfile.idVerified && 'opacity-60 grayscale'}`}>
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  {trustProfile.licenseVerified ? <CheckCircle2 className="text-green-500" size={24} /> : <Circle className="text-gray-300" size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Building size={18} className="text-gray-400"/> Agent License
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">For Real Estate Professionals to get the Trusted Agent badge (Level 4).</p>
                </div>
              </div>
              {!trustProfile.licenseVerified && (
                <button 
                  disabled={!trustProfile.idVerified}
                  onClick={() => updateTrustProfile({ licenseVerified: true })} 
                  className="shrink-0 bg-gray-900 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify License
                </button>
              )}
            </div>

          </div>

          {trustProfile.level === 4 && (
            <div className="mt-8 bg-blue-50 border border-blue-100 p-5 rounded-xl flex items-start gap-3">
              <ShieldCheck className="text-blue-500 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-blue-900">Maximum Trust Level Achieved</h4>
                <p className="text-sm text-blue-700 mt-1">You have full access to all platform capabilities and have earned the Trusted Agent badge on all your properties.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
