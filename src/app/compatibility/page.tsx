"use client";

import { useState, useEffect } from "react";
import { Sparkles, Home, User as UserIcon, CheckCircle2, ChevronRight, Activity, Zap, Dog, Carrot, IndianRupee, ShieldCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function CompatibilityScorePage() {
  const [tenantBudget, setTenantBudget] = useState(25000);
  const [tenantBeds, setTenantBeds] = useState(2);
  const [tenantPets, setTenantPets] = useState(false);
  const [tenantVeg, setTenantVeg] = useState(false);
  const [tenantType, setTenantType] = useState<"Bachelor" | "Couple" | "Family">("Bachelor");
  const [tenantTrust, setTenantTrust] = useState(700);

  // Property Rules
  const [propRent, setPropRent] = useState(26000);
  const [propBeds, setPropBeds] = useState(2);
  const [propPetsAllowed, setPropPetsAllowed] = useState(true);
  const [propVegOnly, setPropVegOnly] = useState(false);
  const [propAllowedTypes, setPropAllowedTypes] = useState<("Bachelor" | "Couple" | "Family")[]>(["Couple", "Family"]);
  const [propMinTrust, setPropMinTrust] = useState(650);

  // Computed Match State
  const [matchScore, setMatchScore] = useState(0);
  const [breakdown, setBreakdown] = useState<{label: string, score: number, desc: string}[]>([]);

  useEffect(() => {
    let totalScore = 0;
    const newBreakdown = [];

    // 1. Budget Match (30% weight)
    const diff = Math.abs(tenantBudget - propRent);
    let budgetScore = 30;
    let budgetDesc = "Exact fit or under budget";
    if (diff > 0) {
      if (propRent > tenantBudget) {
         const overagePercent = (diff / tenantBudget) * 100;
         if (overagePercent <= 5) { budgetScore = 25; budgetDesc = "Slightly over budget"; }
         else if (overagePercent <= 10) { budgetScore = 15; budgetDesc = "Over budget but negotiable"; }
         else { budgetScore = 0; budgetDesc = "Exceeds strict budget constraints"; }
      } else {
         budgetScore = 30; budgetDesc = "Fantastic deal under budget";
      }
    }
    totalScore += budgetScore;
    newBreakdown.push({ label: "Budget Alignment", score: Math.round((budgetScore/30)*100), desc: budgetDesc });

    // 2. Spatial Match (15% weight)
    let bedsScore = 15;
    let bedsDesc = "Perfect space alignment";
    if (tenantBeds !== propBeds) {
       if (propBeds > tenantBeds) {
          bedsScore = 10; bedsDesc = "Extra space available";
       } else {
          bedsScore = 0; bedsDesc = "Insufficient bedrooms";
       }
    }
    totalScore += bedsScore;
    newBreakdown.push({ label: "Space Requirements", score: Math.round((bedsScore/15)*100), desc: bedsDesc });

    // 2.5 Tenant Type Match (15% weight)
    let typeScore = 15;
    let typeDesc = "Preferred tenant profile";
    if (!propAllowedTypes.includes(tenantType)) {
      typeScore = 0;
      typeDesc = `Owner restricts ${tenantType}s`;
    }
    totalScore += typeScore;
    newBreakdown.push({ label: "Tenant Profile Allowed", score: Math.round((typeScore/15)*100), desc: typeDesc });

    // 3. Pet Policy Match (15% weight)
    let petScore = 15;
    let petDesc = "Compatible pet policy";
    if (tenantPets && !propPetsAllowed) {
       petScore = 0;
       petDesc = "Property actively prohibits pets";
    } else if (!tenantPets) {
       petDesc = "No pets associated conflicts";
    }
    totalScore += petScore;
    newBreakdown.push({ label: "Pet Policy", score: Math.round((petScore/15)*100), desc: petDesc });

    // 4. Dietary/Lifestyle Match (25% weight)
    let vegScore = 25;
    let vegDesc = "No lifestyle conflicts";
    if (propVegOnly && !tenantVeg) {
       vegScore = 0;
       vegDesc = "Owner strictly requires vegetarians";
    } else if (tenantVeg && !propVegOnly) {
       vegDesc = "Tenant preferences met without restrictions";
    }
    totalScore += vegScore;
    newBreakdown.push({ label: "Lifestyle Rules", score: Math.round((vegScore/25)*100), desc: vegDesc });

    // 5. Trust Penalty Overlay Strategy
    // If tenant falls below owner's strict trust threshold, tank the score.
    if (tenantTrust < propMinTrust) {
       // Cap the score aggressively if trust fails
       totalScore = Math.min(totalScore, 45); 
    }

    setMatchScore(Math.round(totalScore));
    setBreakdown(newBreakdown);
  }, [tenantBudget, tenantBeds, tenantPets, tenantVeg, tenantType, tenantTrust, propRent, propBeds, propPetsAllowed, propVegOnly, propAllowedTypes, propMinTrust]);

  // Derived Action UI Logic
  const isHigh = matchScore >= 80;
  const isMed = matchScore >= 50 && matchScore < 80;
  
  const scoreColor = isHigh ? "text-green-500" : isMed ? "text-yellow-500" : "text-red-500";
  const bgBadgeColor = isHigh ? "bg-green-50 text-green-700 border-green-200" : isMed ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200";
  
  const guidanceTitle = isHigh ? "Highly Compatible ✅" : isMed ? "Cautious Alignment ⚠️" : "Not Recommended ❌";
  const guidanceAction = isHigh ? "Good Fit — Contact Owner" : isMed ? "Consider — Review Details & Negotiate" : "Explore Better Matches";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-20 px-4 md:px-8 overflow-hidden">
      
      {/* Background aesthetics */}
      <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-br from-[#408A71]/10 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="w-full max-w-[1400px] relative z-10 mx-auto flex flex-col h-[calc(100vh-8rem)] min-h-[700px]">
        
        {/* Top Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-2">
              Match Engine <span className="text-[#408A71]">Simulator</span>
            </h1>
            <p className="text-sm md:text-base text-gray-600 font-medium">
              Interactive compatibility assessment for seamless tenant-owner alignment.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm text-sm font-bold text-gray-700">
             <Activity className="text-blue-500" size={16} /> Live Evaluation
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid lg:grid-cols-12 gap-6 flex-grow min-h-0">
          
          {/* Left Column: Preferences (7 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6 min-h-0 overflow-y-auto pr-2 pb-4 scrollbar-hide">
            <div className="grid md:grid-cols-2 gap-6 h-full">
              
              {/* Tenant Constraints */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-xl flex flex-col">
                 <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><UserIcon size={20} /></div>
                      <h3 className="text-lg font-black text-gray-900">Tenant Profile</h3>
                    </div>
                 </div>

                 <div className="space-y-6 flex-grow flex flex-col justify-between">
                   <div>
                     <label className="text-sm font-bold text-gray-700 flex justify-between mb-2">
                       <span>Max Budget</span>
                       <span className="text-blue-600">₹{tenantBudget.toLocaleString()}</span>
                     </label>
                     <input type="range" min="10000" max="60000" step="1000" value={tenantBudget} onChange={(e) => setTenantBudget(Number(e.target.value))} className="w-full h-2 bg-blue-100 rounded-lg appearance-none accent-blue-600 cursor-pointer" />
                   </div>

                   <div>
                     <label className="text-sm font-bold text-gray-700 flex justify-between mb-2">
                       <span>Trust Score</span>
                       <span className={`font-bold ${tenantTrust < propMinTrust ? 'text-red-500' : 'text-blue-600'}`}>{tenantTrust}</span>
                     </label>
                     <input type="range" min="300" max="850" step="10" value={tenantTrust} onChange={(e) => setTenantTrust(Number(e.target.value))} className="w-full h-2 bg-blue-100 rounded-lg appearance-none accent-blue-600 cursor-pointer" />
                   </div>

                   <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Tenant Category</label>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                         {["Bachelor", "Couple", "Family"].map(type => (
                           <button 
                             key={`type-${type}`} 
                             onClick={() => setTenantType(type as any)} 
                             className={`p-2 rounded-xl border text-center transition-all ${tenantType === type ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'} font-bold text-xs ${type === 'Family' ? 'col-span-2' : ''}`}
                           >
                             {type}
                           </button>
                         ))}
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setTenantPets(!tenantPets)} className={`h-24 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${tenantPets ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}>
                        <Dog size={24} className={tenantPets ? "text-indigo-500" : "text-gray-400"} />
                        <span className="font-bold text-xs">Have Pets</span>
                      </button>
                      <button onClick={() => setTenantVeg(!tenantVeg)} className={`h-24 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${tenantVeg ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}>
                        <Carrot size={24} className={tenantVeg ? "text-green-500" : "text-gray-400"} />
                        <span className="font-bold text-xs">Vegetarian</span> 
                      </button>
                   </div>

                   <div className="mt-auto">
                      <label className="text-sm font-bold text-gray-700 block mb-2">Required Bedrooms</label>
                      <div className="flex gap-2">
                        {[1,2,3,4].map(num => (
                          <button key={`t-bed-${num}`} onClick={() => setTenantBeds(num)} className={`flex-1 py-1.5 font-bold text-sm rounded-xl border transition-all ${tenantBeds === num ? 'bg-blue-600 border-blue-600 text-white shadow-md transform scale-105' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'}`}>
                            {num}
                          </button>
                        ))}
                      </div>
                   </div>
                 </div>
              </div>

              {/* Owner Constraints */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-xl flex flex-col">
                 <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded-xl text-orange-600"><Home size={20} /></div>
                      <h3 className="text-lg font-black text-gray-900">Owner Rules</h3>
                    </div>
                 </div>

                 <div className="space-y-6 flex-grow flex flex-col justify-between">
                   <div>
                     <label className="text-sm font-bold text-gray-700 flex justify-between mb-2">
                       <span>Asking Rent</span>
                       <span className="text-orange-600">₹{propRent.toLocaleString()}</span>
                     </label>
                     <input type="range" min="10000" max="60000" step="1000" value={propRent} onChange={(e) => setPropRent(Number(e.target.value))} className="w-full h-2 bg-orange-100 rounded-lg appearance-none accent-orange-500 cursor-pointer" />
                   </div>

                   <div>
                     <label className="text-sm font-bold text-gray-700 flex justify-between mb-2">
                       <span>Min Trust Required</span>
                       <span className="text-orange-600">{propMinTrust}</span>
                     </label>
                     <input type="range" min="300" max="850" step="10" value={propMinTrust} onChange={(e) => setPropMinTrust(Number(e.target.value))} className="w-full h-2 bg-orange-100 rounded-lg appearance-none accent-orange-500 cursor-pointer" />
                   </div>

                   <div>
                      <label className="text-sm font-bold text-gray-700 block mb-2">Allowed Profiles</label>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {["Bachelor", "Couple", "Family"].map(type => {
                          const tg = type as "Bachelor" | "Couple" | "Family";
                          const isSelected = propAllowedTypes.includes(tg);
                          return (
                            <button 
                              key={`ptype-${type}`} 
                              onClick={() => {
                                if (isSelected) setPropAllowedTypes(prev => prev.filter(t => t !== tg));
                                else setPropAllowedTypes(prev => [...prev, tg]);
                              }} 
                              className={`p-2 rounded-xl border text-center transition-all ${isSelected ? 'bg-orange-500 border-orange-500 text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'} font-bold text-xs ${type === 'Family' ? 'col-span-2' : ''}`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setPropPetsAllowed(!propPetsAllowed)} className={`h-24 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${propPetsAllowed ? 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100' : 'bg-red-50 border-red-200 text-red-700 shadow-sm'}`}>
                        {propPetsAllowed ? <Dog size={24} className="text-gray-400" /> : <div className="relative"><Dog size={24} className="text-red-500" /><div className="absolute inset-0 flex justify-center items-center"><div className="w-full h-[2px] bg-red-600 rotate-45"></div></div></div>}
                        <span className="font-bold text-xs">{propPetsAllowed ? 'Pets OK' : 'No Pets'}</span>
                      </button>
                      <button onClick={() => setPropVegOnly(!propVegOnly)} className={`h-24 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${propVegOnly ? 'bg-green-50 border-green-200 text-green-700 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}>
                        <Carrot size={24} className={propVegOnly ? "text-green-500" : "text-gray-400"} />
                        <span className="font-bold text-xs">{propVegOnly ? 'Veg Only' : 'Any Diet'}</span>
                      </button>
                   </div>

                   <div className="mt-auto">
                      <label className="text-sm font-bold text-gray-700 block mb-2">Property Size</label>
                      <div className="flex gap-2">
                        {[1,2,3,4].map(num => (
                          <button key={`o-bed-${num}`} onClick={() => setPropBeds(num)} className={`flex-1 py-1.5 font-bold text-sm rounded-xl border transition-all ${propBeds === num ? 'bg-orange-500 border-orange-500 text-white shadow-md transform scale-105' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600'}`}>
                            {num}
                          </button>
                        ))}
                      </div>
                   </div>
                 </div>
              </div>
            </div>
            
            {/* Value Statement */}
            <div className="mt-2 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-5 shadow-lg flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-2xl">
                 <ShieldCheck className="text-emerald-400" size={24} />
              </div>
              <h2 className="text-lg font-black text-white pr-4">
                "We don’t just match properties — we match people, rules, and trust."
              </h2>
            </div>
          </div>

          {/* Right Column: Score & Breakdown (5 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Score Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-gray-100 relative items-center justify-center pt-8 pb-6 px-6">
                <div className={`absolute top-0 inset-x-0 h-3 ${isHigh ? 'bg-green-500' : isMed ? 'bg-yellow-500' : 'bg-red-500'} transition-colors duration-500`} />
                <div className="absolute top-6 right-6 opacity-10">
                   <Zap size={100} className={`${scoreColor}`} />
                </div>
                
                <span className={`text-[6rem] leading-[1] font-black tracking-tighter ${scoreColor} transition-colors duration-500 mb-2 drop-shadow-sm`}>
                  {matchScore}<span className="text-5xl">%</span>
                </span>
                
                <div className={`mt-2 px-5 py-1.5 rounded-full font-black text-sm border shadow-sm ${bgBadgeColor} transition-colors duration-500`}>
                  {guidanceTitle}
                </div>
                
                <div className="text-gray-800 font-bold text-lg mt-4 text-center pb-2">
                  {guidanceAction}
                </div>

                {/* Warning if trust triggered the penalty */}
                {tenantTrust < propMinTrust && (
                  <div className="mt-4 w-full bg-red-50/80 border border-red-200 rounded-xl p-3 flex items-start gap-2 animate-pulse">
                     <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                     <p className="text-red-800 font-bold text-xs leading-tight">
                       Low trust score severely limits matching potential with this owner.
                     </p>
                  </div>
                )}
            </div>

            {/* Breakdown Bars */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                   <Activity size={18} className="text-gray-400" />
                   <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">Breakdown</h3>
                </div>
                
                <div className="space-y-5 flex-grow overflow-y-auto pr-1 scrollbar-hide">
                  {breakdown.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="font-bold text-gray-700 text-sm">{item.label}</span>
                        <span className="text-xs font-black text-gray-400 group-hover:text-gray-700 transition-colors">{item.score}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ease-out ${item.score >= 90 ? 'bg-green-500' : item.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${item.score}%` }} 
                        />
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium mt-1 group-hover:text-gray-800 transition-colors">{item.desc}</p>
                    </div>
                  ))}
                </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Hide scrollbar for internal nice scrolling if needed */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
