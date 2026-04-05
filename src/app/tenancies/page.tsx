"use client";

import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, FileText, CheckCircle2, ChevronRight, IndianRupee, Clock, Home, AlertCircle, FileSignature, Loader2, Star, BadgeCheck, Bell, Building, ArrowLeftRight, User as UserIcon, Activity } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { tenancyService } from "@/lib/tenancyService";
import { propertyService } from "@/lib/propertyService";
import { Tenancy, Property } from "@/types/models";

// --- Trust Badge Component ---
const TrustBadge = ({ score }: { score: number }) => (
  <div className="flex items-center gap-1.5 mt-1">
    <div className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider w-max ${score >= 600 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
        <span>{score >= 600 ? '✅' : '⚠️'}</span> {score >= 600 ? 'Verified' : 'Pending Verification'}
    </div>
    <div className="inline-flex items-center gap-1 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-gray-700 uppercase tracking-wider w-max">
        <Star size={12} className="text-yellow-400 fill-yellow-400" /> Score: {score}
    </div>
  </div>
);

// --- Component: Tenant Dashboard ---
const TenantDashboard = ({ tenancies, propertyMap, loading, trustScore }: { tenancies: Tenancy[], propertyMap: Record<string, Property>, loading: boolean, trustScore: number }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
      {/* Left Column: My Rentals (Scrollable) */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Home className="text-[#408A71]" size={24} /> My Rented Properties
          </h2>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-gray-50/50 relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="animate-spin text-[#408A71] mb-4" size={48} />
              <p className="font-semibold text-gray-500">Loading your rentals...</p>
            </div>
          ) : (
            tenancies.map((tenancy) => {
              const renewalThreshold = new Date();
              renewalThreshold.setMonth(renewalThreshold.getMonth() + 1);
              const isRenewalNeeded = new Date(tenancy.end_date || 0) < renewalThreshold;
              return (
                <div key={tenancy.id} className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${isRenewalNeeded ? 'border-amber-200 ring-2 ring-amber-50' : 'border-gray-100 hover:-translate-y-1 hover:shadow-md'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{propertyMap[tenancy.property_id]?.title || "Premium Apartment Suite"}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-1">
                        <Building size={16} /> Landlord: {tenancy.owner_id === 'mock_owner_real' ? 'Alice Reality Corp' : 'Private Landlord'}
                      </div>
                      <TrustBadge score={tenancy.owner_id === 'mock_owner_real' ? 850 : 550} />
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-inner border ${tenancy.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {tenancy.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Monthly Rent</p>
                      <p className="font-black text-[#408A71] text-lg">₹{tenancy.rent_amount?.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Due Date</p>
                      <p className="font-bold text-gray-900 flex items-center gap-1 text-base">
                        <Clock size={14} className="text-amber-500"/> {tenancy.payment_due_day}th
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Deposit</p>
                      <p className="font-bold text-gray-900 text-base">₹{tenancy.deposit_amount?.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">End Date</p>
                      <p className={`font-bold text-base ${isRenewalNeeded ? 'text-red-500 bg-red-50 px-1 rounded-sm' : 'text-gray-900'}`}>{tenancy.end_date}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#408A71] hover:bg-emerald-600 shadow-md shadow-emerald-500/20 text-white py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5">
                      <IndianRupee size={16} /> Pay Rent
                    </button>
                    <button className="flex-1 bg-gray-900 hover:bg-black shadow-md text-white py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5">
                      <FileSignature size={16} /> Agreement
                    </button>
                    <Link href={`/properties/${tenancy.property_id}`} className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center">
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
          
          {!loading && tenancies.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <FileText className="text-gray-300 mb-4" size={48} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Rentals</h3>
              <p className="text-gray-500 text-sm max-w-sm">You haven&apos;t rented any properties yet. Discover places and sign your first digital agreement!</p>
              <Link href="/properties" className="mt-6 inline-block bg-[#408A71] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md transition-transform hover:-translate-y-0.5">Explore Listings</Link>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Alerts & Actions (Fixed width) */}
      <div className="w-full lg:w-96 flex flex-col gap-6 overflow-y-auto pr-2 pb-6">
        {/* Gamified Trust Score Block */}
        <div className="shrink-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 shadow-xl border border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 bg-[#408A71] opacity-20 w-32 h-32 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><ShieldCheck size={14}/> Trust Score Engine</p>
               <div className="flex items-end gap-2 mb-1">
                 <span className="text-5xl font-black text-white tracking-tighter shrink-0">{trustScore}</span>
                 <div className="bg-emerald-500/20 px-2 py-1 rounded inline-block border border-emerald-500/30 mb-2 whitespace-nowrap">
                   <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">✅ Trusted</span>
                 </div>
               </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 shadow-sm">
                <span>300</span>
                <span>Max 900</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-yellow-500 to-emerald-400 h-full rounded-full transition-all duration-1000 w-[70%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col">
           <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
             <Bell size={16} className="text-amber-500 fill-amber-500/20" /> Actions Required
           </h3>
           
           <div className="space-y-2.5 flex-1">
             {(() => {
                const overdueList = tenancies.filter(t => t.status === 'active' && new Date().getDate() > (t.payment_due_day || 1));
                const renewalList = tenancies.filter(t => t.status === 'active' && new Date(t.end_date || 0) < new Date(new Date().setMonth(new Date().getMonth() + 1)));

                if (overdueList.length === 0 && renewalList.length === 0) {
                  return (
                    <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircle2 size={18} /></div>
                      <div>
                        <p className="font-bold text-green-900 text-sm">All Caught Up</p>
                        <p className="text-[10px] uppercase font-bold text-green-600 tracking-wider mt-0.5">Nothing pending</p>
                      </div>
                    </div>
                  );
                }

                return (
                  <>
                    {overdueList.map(t => (
                      <div key={`od_${t.id}`} className="bg-gradient-to-r from-red-50 to-white p-3 rounded-2xl border border-red-100 flex items-center gap-3 relative overflow-hidden group hover:border-red-200 transition-all cursor-pointer shadow-sm">
                        <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0"><AlertCircle size={16} /></div>
                        <div className="flex-1 pr-12">
                          <p className="font-bold text-red-900 text-xs">Rent Overdue</p>
                          <p className="text-[10px] text-red-700 font-medium leading-tight">₹{t.rent_amount?.toLocaleString()} was due on {t.payment_due_day}th.</p>
                        </div>
                        <div className="absolute right-3 bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md scale-95 group-hover:scale-100 outline outline-2 outline-white transition-transform">
                          Pay
                        </div>
                      </div>
                    ))}
                    {renewalList.map(t => (
                      <div key={`rn_${t.id}`} className="bg-gradient-to-r from-amber-50 to-white p-3 rounded-2xl border border-amber-100 flex items-center gap-3 relative overflow-hidden group hover:border-amber-200 transition-all cursor-pointer shadow-sm">
                        <div className="bg-amber-100 p-2 rounded-full text-amber-600 shrink-0"><FileSignature size={16} /></div>
                        <div className="flex-1 pr-16">
                          <p className="font-bold text-amber-900 text-xs">Lease Ending</p>
                          <p className="text-[10px] text-amber-700 font-medium leading-tight">Exp: {t.end_date}</p>
                        </div>
                        <div className="absolute right-3 bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md scale-95 group-hover:scale-100 outline outline-2 outline-white transition-transform">
                          Renew
                        </div>
                      </div>
                    ))}
                  </>
                );
             })()}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Component: Owner & Agent Dashboard ---
const OwnerDashboard = ({ tenancies, propertyMap, loading }: { tenancies: Tenancy[], propertyMap: Record<string, Property>, loading: boolean }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
      {/* Main List */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Building className="text-[#408A71]" size={24} /> Properties & Tenants
          </h2>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-gray-50/50">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="animate-spin text-[#408A71]" size={48} />
            </div>
          ) : (
            <>
            {tenancies.map((tenancy) => (
              <div key={tenancy.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-full flex justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 hover:text-[#408A71] cursor-pointer" title={propertyMap[tenancy.property_id]?.title}>
                        {propertyMap[tenancy.property_id]?.title ? (propertyMap[tenancy.property_id]?.title.length > 25 ? propertyMap[tenancy.property_id]?.title.substring(0,25) + '...' : propertyMap[tenancy.property_id]?.title) : `Property #${tenancy.property_id.slice(-4)}`}
                      </h3>
                      <div className="bg-gray-50 px-3 py-2 rounded-xl mt-2 inline-flex items-center gap-3 border border-gray-100">
                        <div className="bg-white p-1 rounded-full shadow-sm">
                           <UserIcon size={14} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-0.5">Tenant</p>
                          <p className="text-sm font-black text-gray-900 leading-none">{tenancy.tenant_name}</p>
                        </div>
                        <div className="ml-2 pl-3 border-l border-gray-200">
                          <TrustBadge score={tenancy.id === 'mock_t_1' ? 820 : tenancy.id === 'mock_t_2' ? 710 : 540} />
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-1.5 h-max rounded-full text-[10px] font-black uppercase tracking-wider shadow-inner border shrink-0 ${tenancy.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {tenancy.status}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4 bg-gray-50/50 p-2 rounded-xl">
                  <div className="bg-white p-2 rounded-lg border border-gray-100 text-center shadow-sm">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Rent</p>
                    <p className="font-bold text-gray-900 text-sm">₹{tenancy.rent_amount?.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100 text-center shadow-sm">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Start</p>
                    <p className="font-bold text-gray-600 text-sm">{tenancy.start_date}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100 text-center shadow-sm relative overflow-hidden">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest relative z-10">Due</p>
                    <p className="font-bold text-amber-600 text-sm relative z-10 flex justify-center items-center gap-0.5">
                       <Clock size={12}/> {tenancy.payment_due_day}th
                    </p>
                    <div className="absolute inset-0 bg-amber-50 opacity-50"></div>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100 text-center shadow-sm">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Deposit</p>
                    <p className="font-bold text-gray-900 text-sm">₹{(tenancy.deposit_amount||0)/1000}k</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-900 hover:bg-black text-white py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <FileSignature size={14} /> Dig. Agreement
                  </button>
                  <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <IndianRupee size={14} /> Track Payments
                  </button>
                </div>
              </div>
            ))}

            {!loading && tenancies.length === 0 && (
              <div className="h-full flex flex-col justify-center items-center text-center p-8">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="text-gray-300" size={32} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">No Active Tenancies</h3>
                <p className="text-xs text-gray-500 max-w-xs">You haven&apos;t created any tenancies yet. Go to your listings to start an agreement dynamically.</p>
              </div>
            )}
            </>
          )}
        </div>
      </div>

      {/* Right Sidebar: Quick Stats */}
      <div className="w-full lg:w-80 flex flex-col gap-6 overflow-y-auto pr-2 pb-6">
        <div className="bg-gradient-to-b from-[#408A71] to-[#2B604E] rounded-3xl p-6 shadow-xl relative overflow-hidden shrink-0">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <h3 className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-4 flex items-center gap-1.5">
            <Activity className="opacity-70" size={14}/> Portfolio Outlook
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-white/10 border border-white/20 p-3 rounded-2xl backdrop-blur-sm">
               <div>
                  <span className="block text-[9px] uppercase font-bold text-white/70 tracking-widest">Active</span>
                  <span className="text-sm font-semibold text-white">Tenants</span>
               </div>
              <span className="text-xl font-black text-white bg-white/20 px-3 py-1 rounded-xl shadow-inner w-12 text-center">
                {tenancies.filter(t => t.status==='active').length}
              </span>
            </div>
            <div className="flex justify-between items-center bg-white/10 border border-white/20 p-3 rounded-2xl backdrop-blur-sm">
               <div>
                  <span className="block text-[9px] uppercase font-bold text-white/70 tracking-widest">Pending</span>
                  <span className="text-sm font-semibold text-white">Invites</span>
               </div>
              <span className="text-xl font-black text-amber-300 bg-amber-400/20 shadow-inner px-3 py-1 rounded-xl w-12 text-center">
                {tenancies.filter(t => t.status==='pending').length}
              </span>
            </div>
            <div className="flex justify-between items-center bg-gray-900/40 border border-white/10 p-4 rounded-2xl backdrop-blur-md shadow-2xl mt-4">
              <div>
                 <span className="block text-[9px] uppercase font-bold text-white/50 tracking-widest">Estimated</span>
                 <span className="text-sm font-bold text-white/90">Monthly Yield</span>
              </div>
              <span className="text-2xl font-black text-emerald-400 tracking-tight">
                ₹{(tenancies.reduce((acc, curr) => acc + (curr.rent_amount || 0), 0) / 1000).toFixed(1)}k
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm shrink-0 flex flex-col">
          <h4 className="font-black text-gray-900 mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
            <AlertCircle className="text-amber-500" size={16}/> Payments Status
          </h4>
          <div className="space-y-2 flex-1">
            {(() => {
              const today = new Date();
              const overdueList = tenancies.filter(t => {
                if (t.status !== 'active') return false;
                const dueDay = t.payment_due_day || 1;
                return today.getDate() > dueDay;
              });
              if (overdueList.length === 0) {
                return (
                  <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100 flex flex-col items-center text-center justify-center h-24">
                    <CheckCircle2 className="text-green-500 mb-1" size={24} />
                    <p className="font-bold text-green-900 text-xs uppercase tracking-wider">Payments Clear</p>
                  </div>
                );
              }
              return (
                <div className="space-y-2">
                  {overdueList.map(t => (
                    <div key={t.id} className="bg-amber-50 p-3 rounded-2xl border border-amber-100 flex gap-3 shadow-sm hover:border-amber-200 transition-colors">
                      <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 shadow-sm border border-amber-100">
                        <AlertCircle className="text-amber-500" size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-amber-900 text-xs">Overdue for {t.tenant_name}</p>
                        <p className="text-[10px] text-amber-700 font-medium leading-tight mt-0.5">₹{t.rent_amount?.toLocaleString()} missed on {t.payment_due_day}th.</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function TenanciesDashboard() {
  const { userProfile, user, loading: authLoading } = useAuth();
  
  const [tenancies, setTenancies] = useState<Tenancy[]>([]);
  const [propertyMap, setPropertyMap] = useState<Record<string, Property>>({});
  const [loading, setLoading] = useState(true);
  const [viewModeOverride, setViewModeOverride] = useState<'tenant' | 'owner' | null>(null);

  // Derive active view mode based on explicit toggle, or fallback to profile role
  const isTenant = viewModeOverride !== null ? viewModeOverride === 'tenant' : userProfile?.role === 'tenant';

  useEffect(() => {
    if (authLoading) return;

    const fetchData = async () => {
      try {
        let fetchedTenancies: Tenancy[] = [];
        let fetchedProps: Property[] = [];
        
        if (!user?.uid) {
          if (isTenant) {
            fetchedTenancies = await tenancyService.getTenanciesByTenant("demo_user"); 
          } else {
            fetchedTenancies = await tenancyService.getTenanciesByOwner("demo_user");
          }
          fetchedProps = []; 
        } else {
          if (isTenant) {
            fetchedTenancies = await tenancyService.getTenanciesByTenant(user.uid);
          } else {
            fetchedTenancies = await tenancyService.getTenanciesByOwner(user.uid);
          }
          fetchedProps = await propertyService.getProperties(isTenant ? {} : { ownerId: user.uid });
        }
        
        const propMap: Record<string, Property> = {};
        fetchedProps.forEach(p => { propMap[p.id] = p; });
        
        setTenancies(fetchedTenancies);
        setPropertyMap(propMap);
      } catch (error) {
        console.error("Failed to load tenancies dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, isTenant, authLoading]);

  if (authLoading) {
    return (
      <div className="h-screen bg-[#FDFDFD] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#408A71]/20 border-t-[#408A71] rounded-full animate-spin shadow-lg"></div>
      </div>
    );
  }

  return (
    <div className="h-screen pt-[4.5rem] bg-[#FAFAFA] flex flex-col overflow-hidden">
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col h-full overflow-hidden">
        
        {/* Universal Header (Compact) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 z-10 relative">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center border border-gray-200">
               <ShieldCheck className="text-gray-700" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                 <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none">Tenancies</h1>
                 <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border shadow-sm ${isTenant ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                   {isTenant ? 'Tenant' : 'Owner'} Mode
                 </span>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                {isTenant ? "Manage Your Rentals & Agreements" : "Manage Your Tenants & Income"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Demo Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner border border-gray-200">
              <button 
                onClick={() => setViewModeOverride('tenant')}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${isTenant ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Tenant
              </button>
              <button 
                onClick={() => setViewModeOverride('owner')}
                className={`flex items-center justify-center px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${!isTenant ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Owner
              </button>
            </div>
            {!isTenant && (
              <Link href="/post" className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-black transition-colors hidden sm:block">
                + New Property
              </Link>
            )}
          </div>
        </div>

        {/* Dynamic Role Render (Takes remaining height) */}
        <div className="flex-1 overflow-hidden">
          {isTenant ? (
            <TenantDashboard tenancies={tenancies} propertyMap={propertyMap} loading={loading} trustScore={userProfile?.trustScore || 650} />
          ) : (
            <OwnerDashboard tenancies={tenancies} propertyMap={propertyMap} loading={loading} />
          )}
        </div>

      </div>
    </div>
  );
}
