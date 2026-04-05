"use client";

import { useState } from "react";
import { Star, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Camera, Key, Lock, Phone, MessageSquare, ChevronDown, ThumbsUp, Building } from "lucide-react";

export default function VerificationDashboard() {
  const [score, setScore] = useState(600);
  const [streak, setStreak] = useState(0);
  const [lastAction, setLastAction] = useState<{ text: string, impact: number } | null>(null);
  const [animatingImpact, setAnimatingImpact] = useState<number | null>(null);

  const getScoreCategory = (s: number) => {
    if (s >= 800) return { label: "Exceptional", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", stroke: "text-emerald-500" };
    if (s >= 700) return { label: "Good", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", stroke: "text-blue-500" };
    if (s >= 600) return { label: "Average", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", stroke: "text-amber-500" };
    return { label: "High Risk", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", stroke: "text-red-500" };
  };

  const handleUpdate = (type: string) => {
    let amt = 0;
    let reason = "";
    let newStreak = streak;
    let applyBonus = false;

    if (type === 'early') {
      amt = 20; reason = 'Paid Rent Early'; newStreak += 1;
    } else if (type === 'on-time') {
      amt = 10; reason = 'Paid Rent On-time'; newStreak += 1;
    } else if (type === 'late') {
      amt = -25; reason = 'Paid Rent Late'; newStreak = 0;
    } else if (type === 'damage') {
      amt = -50; reason = 'Property Damage'; newStreak = 0;
    } else if (type === 'complaint') {
      amt = -30; reason = 'Complaint Raised';
    } else if (type === 'kyc') {
      amt = 50; reason = 'Identity Verified';
    }

    if (newStreak === 3) {
      applyBonus = true;
      newStreak = 0;
    }

    setStreak(newStreak);
    const totalImpact = amt + (applyBonus ? 25 : 0);
    
    setAnimatingImpact(totalImpact);
    
    setScore(prev => Math.min(900, Math.max(300, prev + totalImpact)));
    setLastAction({ text: `${reason}${applyBonus ? ' + Bonus' : ''}`, impact: totalImpact });
    
    setTimeout(() => setAnimatingImpact(null), 1000);
    setTimeout(() => setLastAction(null), 4000);
  };

  const cat = getScoreCategory(score);
  
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const percent = (score - 300) / 600;
  const offset = circumference - (percent * circumference);

  const scrollToNext = () => {
    document.getElementById("verification-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth relative bg-[#FAFAFA]">
      
      {/* ----------------------------------------------------- */}
      {/* SLIDE 1: TRUST SCORE ENGINE                           */}
      {/* ----------------------------------------------------- */}
      <section 
        id="trust-section" 
        className="w-full min-h-screen h-screen snap-center flex flex-col justify-center items-center relative py-20 px-6"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center z-10">
          
          {/* Left: Philosophy & Description */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#408A71]/10 text-[#408A71] rounded-full text-xs font-black tracking-widest uppercase mb-6 shadow-sm border border-[#408A71]/20">
              <Star size={14} fill="currentColor" /> Trust Engine
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Behavior dictates <br/>your <span className="text-[#408A71]">Reputation.</span>
            </h1>
            
            <p className="text-xl text-gray-500 mb-8 font-medium leading-relaxed max-w-lg">
              We replace guesswork with a dynamic <strong>300-900 point ledger</strong>. Every on-time payment builds creditability, while damages heavily penalize scores—creating radical accountability.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-lg">
               <div>
                 <div className="flex items-center gap-2 mb-2 font-black text-gray-900"><CheckCircle2 className="text-[#408A71]" size={20}/> Tenants</div>
                 <p className="text-sm text-gray-500 leading-relaxed font-medium">Paying rent early unlocks streak bonuses. Missing payments alerts future owners.</p>
               </div>
               <div>
                 <div className="flex items-center gap-2 mb-2 font-black text-gray-900"><Building className="text-blue-500" size={20}/> Owners</div>
                 <p className="text-sm text-gray-500 leading-relaxed font-medium">Fast resolutions and dispute-free history guarantees algorithmic prioritization.</p>
               </div>
            </div>
          </div>

          {/* Right: The Simulator UI */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12 relative flex flex-col items-center max-w-md mx-auto w-full">
            
            <h3 className="text-lg font-black text-gray-400 uppercase tracking-widest mb-8">Live Simulation Phase</h3>
            
            <div className="relative flex flex-col items-center justify-center mb-10 w-full">
              <div className="relative w-[240px] h-[240px] transition-transform hover:scale-105 duration-300">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-sm">
                  <circle cx="120" cy="120" r={radius} stroke="currentColor" strokeWidth="18" fill="transparent" className="text-gray-100" />
                  <circle cx="120" cy="120" r={radius} stroke="currentColor" strokeWidth="18" fill="transparent" 
                      strokeDasharray={circumference} 
                      strokeDashoffset={offset} 
                      className={`${cat.stroke} transition-all duration-[1500ms] ease-in-out drop-shadow-lg`} 
                      strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-7xl font-black text-gray-900 tracking-tighter ${animatingImpact ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>{score}</span>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mt-2 border shadow-sm ${cat.bg} ${cat.color} ${cat.border}`}>
                    {cat.label}
                  </span>
                </div>

                {animatingImpact !== null && (
                  <div className={`absolute top-1/2 -right-6 transform -translate-y-1/2 text-3xl font-black animate-out fade-out slide-out-to-top-8 duration-1000 origin-center ${animatingImpact > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {animatingImpact > 0 ? '+' : ''}{animatingImpact}
                  </div>
                )}
              </div>
              
              <div className="h-6 flex items-center justify-center w-full mt-4">
                {lastAction ? (
                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                    <span className="text-sm font-bold text-gray-900">{lastAction.text}</span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded ${lastAction.impact > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {lastAction.impact > 0 ? '+' : ''}{lastAction.impact}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-gray-400">Interact below to view impact</p>
                )}
              </div>
            </div>

            <div className="w-full relative">
               <div className="absolute -top-3 right-0">
                  {streak > 0 && <p className="text-xs font-black text-orange-500 animate-pulse bg-orange-50 px-2 py-0.5 rounded border border-orange-100">🔥 Streak: {streak}/3</p>}
               </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleUpdate('early')} className="px-4 py-3.5 bg-white border border-gray-200 hover:border-emerald-300 rounded-2xl transition-all shadow-sm flex items-center justify-between group overflow-hidden relative">
                  <div className="absolute inset-0 bg-emerald-50 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  <span className="text-xs font-black text-gray-700 group-hover:text-emerald-900 relative z-10">Paid Early</span>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded relative z-10">+20</span>
                </button>
                <button onClick={() => handleUpdate('on-time')} className="px-4 py-3.5 bg-white border border-gray-200 hover:border-green-300 rounded-2xl transition-all shadow-sm flex items-center justify-between group overflow-hidden relative">
                  <div className="absolute inset-0 bg-green-50 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  <span className="text-xs font-black text-gray-700 group-hover:text-green-900 relative z-10">On-time</span>
                  <span className="text-[10px] font-black text-green-600 bg-green-100 px-2 py-1 rounded relative z-10">+10</span>
                </button>
                <button onClick={() => handleUpdate('late')} className="px-4 py-3.5 bg-white border border-gray-200 hover:border-orange-300 rounded-2xl transition-all shadow-sm flex items-center justify-between group overflow-hidden relative">
                  <div className="absolute inset-0 bg-orange-50 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  <span className="text-xs font-black text-gray-700 group-hover:text-orange-900 relative z-10">Paid Late</span>
                  <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2 py-1 rounded relative z-10">-25</span>
                </button>
                <button onClick={() => handleUpdate('damage')} className="px-4 py-3.5 bg-white border border-gray-200 hover:border-red-400 rounded-2xl transition-all shadow-sm flex items-center justify-between group overflow-hidden relative">
                  <div className="absolute inset-0 bg-red-50 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  <span className="text-xs font-black text-gray-700 group-hover:text-red-900 relative z-10">Damage</span>
                  <span className="text-[10px] font-black text-red-600 bg-red-100 px-2 py-1 rounded relative z-10">-50</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
          <button onClick={scrollToNext} className="text-[#408A71] flex flex-col items-center hover:opacity-70 transition-opacity">
            <span className="text-[10px] font-black tracking-widest uppercase mb-1">Identity Pipeline</span>
            <ChevronDown size={28} />
          </button>
        </div>
      </section>

      {/* ----------------------------------------------------- */}
      {/* SLIDE 2: VERIFICATION SYSTEM                          */}
      {/* ----------------------------------------------------- */}
      <section 
        id="verification-section" 
        className="w-full min-h-screen h-screen snap-center flex flex-col justify-center items-center relative py-20 px-6 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10">
          
          {/* Left: Pipeline UI */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200 border border-gray-200 overflow-hidden relative w-full flex flex-col">
            <div className="p-8 border-b border-gray-100 bg-gray-50 shrink-0">
               <h3 className="text-2xl font-black text-gray-900 mb-1">Identity Validation</h3>
               <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Multi-Tier KYC Process</p>
            </div>
            
            <div className="p-8 space-y-5 overflow-y-auto flex-1 relative custom-scrollbar">
              <div className="absolute left-14 top-12 bottom-12 w-0.5 bg-gray-200 z-0 hidden sm:block"></div>

              {/* L1 */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border-2 border-gray-200 flex items-center justify-center shrink-0 shadow-sm relative z-10">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <div className="p-5 bg-white border border-gray-200 rounded-2xl flex-1 shadow-sm w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-black text-gray-900">L1: Unverified</h4>
                    <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded shadow-inner">Max Score: 550</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                     <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2 py-1 rounded">✕ No Listings</span>
                     <span className="text-[10px] font-bold bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-200">✓ Browse Only</span>
                  </div>
                </div>
              </div>

              {/* L2 */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border-2 border-orange-200 flex items-center justify-center shrink-0 shadow-sm relative z-10">
                  <Phone size={20} className="text-orange-500" />
                </div>
                <div className="p-5 bg-white border border-gray-200 rounded-2xl flex-1 shadow-sm w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-black text-gray-900">L2: Phone Verified</h4>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded shadow-inner border border-emerald-200">+30 Score</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                     <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">✓ Up to 2 Listings</span>
                     <span className="text-[10px] font-bold bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-100">! Caution Badge Shown</span>
                  </div>
                </div>
              </div>

              {/* L3 */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center transform scale-100 md:scale-105 origin-left py-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border-2 border-blue-400 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 relative z-10">
                  <ShieldCheck size={20} className="text-blue-600" />
                </div>
                <div className="p-6 bg-white border-2 border-blue-200 rounded-3xl flex-1 shadow-xl shadow-blue-500/5 relative overflow-hidden w-full">
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-[9px] font-black px-4 py-1.5 rounded-bl-xl tracking-widest uppercase">Target</div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-black text-lg text-gray-900">L3: Identity Clear</h4>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-4">Aadhar/PAN & Live Selfie Match required.</p>
                  <div className="flex flex-wrap gap-2">
                     <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1.5"><ShieldCheck size={12}/> Verified Badge</span>
                     <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">+50 Base Trust</span>
                  </div>
                </div>
              </div>

              {/* L4 */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center shrink-0 shadow-sm relative z-10">
                  <Key size={20} className="text-purple-600" />
                </div>
                <div className="p-5 bg-white border border-gray-200 rounded-2xl flex-1 shadow-sm w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-black text-gray-900">L4: Asset Proof</h4>
                    <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-2 py-0.5 rounded shadow-inner border border-purple-200">Uncapped Limits</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                     <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">✓ Unlimited Listings</span>
                     <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-100 flex items-center gap-1"><Star size={12} className="fill-purple-700" /> Max Search Rank</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Pitch & Context */}
          <div className="text-left md:order-last order-first">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black tracking-widest uppercase mb-6 shadow-sm border border-blue-200">
              <ShieldCheck size={14} /> Verification System
            </div>
            
            <h2 className="text-5xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Scam-free by <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#408A71]">Design.</span>
            </h2>
            
            <p className="text-xl text-gray-500 mb-8 font-medium leading-relaxed">
              Base behaviors mean nothing if the identity is fake. We mandate hard limitations on unverified users, and mathematically reward those who complete our automated multi-tier KYC.
            </p>

            <button onClick={() => {document.getElementById("trust-section")?.scrollIntoView({ behavior: "smooth" })}} className="inline-flex items-center gap-2 font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-widest text-xs pt-4 border-t border-gray-200">
               Validation unlocks score capacity <ArrowRight size={14} className="-rotate-45" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
