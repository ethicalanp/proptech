"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ChevronDown, CheckCircle2, Lock, Star, Search, HeartHandshake, FileSignature, Key, Activity, ActivityIcon, Link as LinkIcon, Camera, UploadCloud, Clock, IndianRupee, Bell, AlertTriangle, User as UserIcon, Building, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { getVerificationBadge } from "@/context/AuthContext";

export default function ProductJourneyPage() {
  const [animStep, setAnimStep] = useState(0);
  
  // Matching Simulator State
  const [matchScore, setMatchScore] = useState(82);
  const [activeTraits, setActiveTraits] = useState<string[]>(["Early Bird", "Pet Friendly"]);
  const [isMatching, setIsMatching] = useState(false);

  const tenantTraits = ["Early Bird", "Pet Owner", "Quiet", "Long Term", "Non-Smoker"];
  const landlordPrefs = ["Early Bird", "Pet Friendly", "Quiet Preferred", "Long Term", "Non-Smoker Only"];

  const simulateMatch = (trait: string) => {
    setIsMatching(true);
    setTimeout(() => {
      if (activeTraits.includes(trait)) {
        setActiveTraits(prev => prev.filter(t => t !== trait));
        setMatchScore(prev => Math.max(30, prev - 15));
      } else {
        setActiveTraits(prev => [...prev, trait]);
        setMatchScore(prev => Math.min(100, prev + 15));
      }
      setIsMatching(false);
    }, 800);
  };

  // Cycle animation for the "Verification" step
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimStep((prev) => (prev + 1) % 3);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const badgeStates = [
    { 
      score: 580, 
      badge: getVerificationBadge(2, 'owner'), 
      action: "Level 1: Basic Identity", 
      details: "Mobile OTP + Email Verification",
      docs: ["Valid Phone Number", "Email Access"],
      icon: <LinkIcon size={20} className="text-[#408A71]" />
    },
    { 
      score: 650, 
      badge: getVerificationBadge(3, 'owner'), 
      action: "Level 2: Trusted Member", 
      details: "Government Issued identity",
      docs: ["Aadhar / PAN Card", "Live Selfie Match"],
      icon: <Camera size={20} className="text-[#408A71]" />
    },
    { 
      score: 850, 
      badge: getVerificationBadge(4, 'owner'), 
      action: "Level 3: Power Lister", 
      details: "Commercial & Licensing Depth",
      docs: ["RERA License", "Property Title Verification"],
      icon: <UploadCloud size={20} className="text-[#408A71]" />
    },
  ];

  const currentBadgeState = badgeStates[animStep];

  // Trust Ledger State
  const [demoScore, setDemoScore] = useState(600);
  const [ledger, setLedger] = useState<{ action: string; impact: number; id: number }[]>([]);
  const [isUpdatingScore, setIsUpdatingScore] = useState(false);

  const addLedgerEvent = (action: string, impact: number) => {
    setIsUpdatingScore(true);
    const newEvent = { action, impact, id: Date.now() };
    setLedger(prev => [newEvent, ...prev].slice(0, 5));
    
    setTimeout(() => {
      setDemoScore(prev => Math.min(900, Math.max(300, prev + impact)));
      setIsUpdatingScore(false);
    }, 500);
  };

  // Scroll Reveal Logic
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionIdx = parseInt(entry.target.getAttribute('data-section') || '0');
          setVisibleSections(prev => [...new Set([...prev, sectionIdx])]);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section[data-section]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-[#408A71] selection:text-white pb-32">
      
      {/* SECTION 0: HERO */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-[#408A71]/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out flex flex-col items-center w-full max-w-5xl">
          <div className="p-5 bg-white rounded-3xl shadow-lg border border-gray-100 mb-8 transform -rotate-3 hover:rotate-0 transition-transform">
            <HeartHandshake className="text-[#408A71]" size={56} />
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tight leading-tight mb-8">
            The standard for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#408A71] to-emerald-400">verified reality</span>.
          </h1>
          <p className="text-lg md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto">
            A comprehensive ecosystem of trust, dynamic scoring, and intelligent matchmaking. Built for the modern real estate economy.
          </p>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center text-[#408A71] animate-bounce cursor-pointer">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">The Journey</p>
          <ChevronDown size={28} />
        </div>
      </section>

      {/* STRIP: Timeline */}
      <div className="relative max-w-6xl mx-auto border-l-2 border-dashed border-gray-200 ml-8 md:ml-auto md:border-l-0">

        {/* STEP 1: Smart Matching System */}
        <section data-section="1" className={`py-32 px-6 relative md:flex md:items-center md:gap-20 transition-all duration-1000 ${visibleSections.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="md:w-1/2 mb-12 md:mb-0 relative z-10">
            <div className="md:text-right pr-0 md:pr-12">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-purple-200">
                 <Key size={12} /> Step 1
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Smart Matching System</h2>
               <p className="text-lg text-gray-600 mb-6 font-medium">
                 We compare property rules, tenant profiles, and lifestyle preferences to generate an accurate compatibility rating, saving thousands of hours in negotiation.
               </p>
            </div>
          </div>

          <div className="md:w-1/2 relative">
             <div className="absolute top-1/2 -left-8 md:-left-10 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full z-20 shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
             
             {/* Interactive Matching Simulator */}
             <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform transition-all hover:translate-y-[-5px]">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-black text-gray-900 text-xl">Algo-Match</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase mt-1">Tenant ↔ Property</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${isMatching ? 'bg-purple-50 text-purple-600 border-purple-200 animate-pulse' : 'bg-green-50 text-green-600 border-green-200'}`}>
                    {isMatching ? 'Processing...' : 'Evaluated'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-50 p-2 rounded text-center">Tenant</p>
                    {tenantTraits.map(trait => (
                      <button
                        key={trait}
                        onClick={() => simulateMatch(trait)}
                        disabled={isMatching}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${activeTraits.includes(trait) ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'}`}
                      >
                        {trait}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-50 p-2 rounded text-center">Owner Rules</p>
                    {landlordPrefs.map((pref, i) => (
                      <div key={pref} className={`px-4 py-2.5 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${activeTraits.includes(tenantTraits[i]) ? 'bg-purple-50 text-purple-900 border-purple-200 shadow-inner' : 'bg-gray-50/50 text-gray-400 border-gray-100'}`}>
                        {pref}
                        {activeTraits.includes(tenantTraits[i]) && <CheckCircle2 size={16} className="text-purple-600" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative w-full bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-between p-6 overflow-hidden shadow-inner">
                   {isMatching && <div className="absolute inset-0 bg-purple-500/20 animate-pulse" />}
                   
                   <div>
                     <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">Final Compatibility</p>
                     <p className="text-sm font-medium text-gray-400">System Recommendation</p>
                   </div>
                   
                   <div className="flex flex-col items-end">
                     <p className={`text-5xl font-black transition-all ${matchScore > 70 ? 'text-green-400' : matchScore > 40 ? 'text-amber-400' : 'text-red-400'}`}>
                       {matchScore}%
                     </p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* STEP 2: Trust Score */}
        <section data-section="2" className={`py-32 px-6 relative md:flex md:items-center md:flex-row-reverse md:gap-20 transition-all duration-1000 delay-100 ${visibleSections.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="md:w-1/2 mb-12 md:mb-0 relative z-10">
            <div className="pl-0 md:pl-12">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-amber-200">
                 <Star size={12} fill="currentColor" /> Step 2
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Trust Score</h2>
               <p className="text-lg text-gray-600 mb-6 font-medium">
                 Your behavior shapes your real estate reputation. A real-time ledger that rewards good tenants and accountable landlords. High trust scores dominate the algorithm.
               </p>
            </div>
          </div>

          <div className="md:w-1/2 relative flex justify-end">
             <div className="absolute top-1/2 -left-8 md:right-auto md:-right-10 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full z-20 shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
             
             {/* Interactive Trust Ledger */}
             <div className="w-full bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 flex flex-col gap-6 transform transition-all hover:translate-y-[-5px]">
               <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                 <div className="text-left">
                   <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Live Trust Score</p>
                   <div className="flex items-end gap-2">
                     <p className={`text-6xl font-black transition-colors duration-500 tracking-tighter ${isUpdatingScore ? 'text-[#408A71]' : 'text-gray-900'}`}>
                       {demoScore}
                     </p>
                   </div>
                 </div>
                 <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border-2 shadow-inner transition-colors duration-500 ${demoScore >= 700 ? 'bg-green-50 border-green-200 text-green-500' : demoScore >= 500 ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-red-50 border-red-200 text-red-500'}`}>
                   {demoScore >= 700 ? <ShieldCheck size={40} /> : demoScore >= 500 ? <AlertTriangle size={40} /> : <Lock size={40} />}
                 </div>
               </div>

               <div>
                 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Simulate Behavior</p>
                 <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => addLedgerEvent("On-time Payment", 15)} className="px-4 py-3 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-xl text-xs font-bold border border-gray-200 hover:border-green-300 transition-all shadow-sm flex justify-between items-center group">
                      <span>On-time Payment</span>
                      <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">+15</span>
                   </button>
                   <button onClick={() => addLedgerEvent("Complete KYC", 50)} className="px-4 py-3 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-xl text-xs font-bold border border-gray-200 hover:border-emerald-300 transition-all shadow-sm flex justify-between items-center group">
                      <span>Complete KYC</span>
                      <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">+50</span>
                   </button>
                   <button onClick={() => addLedgerEvent("Late Payment", -25)} className="px-4 py-3 bg-white hover:bg-amber-50 text-gray-700 hover:text-amber-700 rounded-xl text-xs font-bold border border-gray-200 hover:border-amber-300 transition-all shadow-sm flex justify-between items-center group">
                      <span>Late Payment</span>
                      <span className="text-amber-600 bg-amber-100 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">-25</span>
                   </button>
                   <button onClick={() => addLedgerEvent("Property Damage", -100)} className="px-4 py-3 bg-white hover:bg-red-50 text-gray-700 hover:text-red-700 rounded-xl text-xs font-bold border border-gray-200 hover:border-red-300 transition-all shadow-sm flex justify-between items-center group">
                      <span>Property Damage</span>
                      <span className="text-red-600 bg-red-100 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">-100</span>
                   </button>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* STEP 3: Verification */}
        <section data-section="3" className={`py-32 px-6 relative md:flex md:items-center md:gap-20 transition-all duration-1000 delay-200 ${visibleSections.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="md:w-1/2 mb-12 md:mb-0 relative z-10">
            <div className="md:text-right pr-0 md:pr-12">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-black tracking-widest uppercase mb-4 border border-blue-200">
                 <ShieldCheck size={12} /> Step 3
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Verification</h2>
               <p className="text-lg text-gray-600 mb-6 font-medium">
                 Robust KYC integration prevents fraud. The higher your verification tier, the more trust you unlock in the ecosystem. Verify to boost your score and get premium listings.
               </p>
            </div>
          </div>

          <div className="md:w-1/2 relative">
             <div className="absolute top-1/2 -left-8 md:-left-10 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full z-20 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
             
             {/* Detailed Verification Pipeline */}
             <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all hover:translate-y-[-5px]">
               <div className="bg-gray-900 p-8 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ShieldCheck size={120} />
                 </div>
                 <div className="relative z-10">
                   <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Automated KYC Engine</p>
                   <h3 className="font-black text-2xl mb-1">Identity Pipeline</h3>
                 </div>
               </div>

               <div className="p-8">
                 <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                   <div className="flex flex-col">
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Target Score Tier</p>
                     <p className="text-4xl font-black text-gray-900 leading-none">{currentBadgeState.score}</p>
                   </div>
                   <div className={`px-5 py-2.5 rounded-full font-bold text-sm ${currentBadgeState.badge.bg} shadow-sm flex items-center gap-2`}>
                     {currentBadgeState.badge.icon} {currentBadgeState.badge.label}
                   </div>
                 </div>

                 <div className="space-y-6">
                   <div className="relative">
                     <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black shadow-inner border border-blue-100">
                          {currentBadgeState.icon}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{currentBadgeState.action}</p>
                          <p className="text-xs text-gray-500 font-medium">{currentBadgeState.details}</p>
                        </div>
                     </div>
                     
                     <div className="ml-14 grid grid-cols-1 gap-2 mt-4">
                        {currentBadgeState.docs.map(doc => (
                          <div key={doc} className="flex items-center gap-3 text-xs font-bold text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                            <CheckCircle2 size={16} className="text-blue-500" />
                            {doc}
                          </div>
                        ))}
                     </div>
                   </div>

                   <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-8">
                     <div 
                       className="h-full bg-blue-500 transition-all duration-1000 ease-out relative" 
                       style={{ width: `${(animStep + 1) * 33.33}%` }} 
                     >
                       <div className="absolute inset-0 bg-white/30 animate-[subtlePulse_2s_ease-in-out_infinite]" />
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* STEP 4: Tenancy Management */}
        <section data-section="4" className={`py-32 px-6 relative md:flex md:items-center md:flex-row-reverse md:gap-20 transition-all duration-1000 delay-300 ${visibleSections.includes(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="md:w-1/2 mb-12 md:mb-0 relative z-10">
             <div className="pl-0 md:pl-12">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-white rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-md">
                 <LayoutDashboard size={12} /> Step 4
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Tenancy Management</h2>
               <p className="text-lg text-gray-600 mb-6 font-medium">
                 Once matched and verified, generate digital agreements, track payment history automatically, and maintain your trust score effortlessly.
               </p>
             </div>
          </div>

          <div className="md:w-1/2 relative flex justify-end">
             <div className="absolute top-1/2 -left-8 md:right-auto md:-right-10 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full z-20 shadow-[0_0_15px_rgba(17,24,39,0.6)]" />
             
             {/* Tenancy Dashboard Simulator */}
             <div className="w-full bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 flex flex-col gap-6 transform transition-all hover:translate-y-[-5px]">
               <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-gray-100 rounded-xl text-gray-700">
                     <FileSignature size={24} />
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-[#408A71] uppercase tracking-widest mb-1">Active Tenancy</p>
                     <h3 className="font-black text-gray-900 text-lg">Skyline Apartments #4B</h3>
                   </div>
                 </div>
                 <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                   <p className="text-xs text-gray-500 font-bold mb-2 uppercase tracking-wide">Monthly Rent</p>
                   <p className="text-2xl font-black text-gray-900">₹32,500</p>
                 </div>
                 <div className="bg-orange-50 p-5 rounded-2xl border border-orange-200">
                   <p className="text-xs text-orange-600 font-bold mb-2 uppercase tracking-wide">Next Due</p>
                   <p className="text-xl font-black text-orange-700 flex items-center gap-2"><Clock size={18}/> Tomorrow</p>
                 </div>
               </div>

               <div className="flex gap-3 mt-2">
                 <button className="flex-1 bg-gray-900 text-white rounded-xl py-4 text-sm font-bold hover:bg-black transition-all shadow-md flex items-center justify-center gap-2">
                   View E-Agreement
                 </button>
                 <button className="flex-1 bg-[#408A71] text-white rounded-xl py-4 text-sm font-bold hover:bg-emerald-600 transition-all shadow-md">
                   Record Payment
                 </button>
               </div>
             </div>
          </div>
        </section>

      </div>

    </div>
  );
}
