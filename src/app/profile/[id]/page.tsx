"use client";

import { use } from "react";
import Link from "next/link";
import { BadgeCheck, Star, Calendar, MessageSquare, Home, MapPin, Building, Key, Clock } from "lucide-react";

export default function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const isAgent = unwrappedParams.id.includes("agent");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-grow">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-blue-100 border-4 border-white shadow-lg flex-shrink-0 flex items-center justify-center text-4xl font-extrabold text-blue-500">
            {isAgent ? 'A' : 'O'}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900">
                {isAgent ? 'Proptech Reality Cop.' : 'Private Landlord'}
              </h1>
              {isAgent && (
                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full w-max">
                  <BadgeCheck size={14} /> VERIFIED AGENT
                </span>
              )}
            </div>
            
            <p className="text-gray-500 text-lg mb-6">
              {isAgent ? 'Top-rated real estate agency serving the Kozhikode area since 2015.' : 'Local property owner offering premium apartments without brokerage.'}
            </p>

            <div className="flex flex-wrap gap-6 text-sm font-semibold text-gray-700">
               <div className="flex items-center gap-2">
                 <Star className="text-yellow-400 fill-yellow-400" size={18} />
                 <span>4.9 (128 reviews)</span>
               </div>
               <div className="flex items-center gap-2">
                 <Home className="text-[#408A71]" size={18} />
                 <span>{isAgent ? '45 Active Listings' : '3 Active Listings'}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Calendar className="text-gray-400" size={18} />
                 <span>Joined 2021</span>
               </div>
               <div className="flex items-center gap-2 text-[#408A71]">
                 <MessageSquare size={18} />
                 <span>Usually responds in 1 hr</span>
               </div>
            </div>
          </div>

          {/* Contact Button */}
          <div className="w-full md:w-auto mt-6 md:mt-0">
            <button className="w-full md:w-auto bg-[#408A71] hover:bg-[#34745c] text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
              Contact {isAgent ? 'Agent' : 'Owner'}
            </button>
          </div>
        </div>

        {/* Listings by this user */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Properties by this {isAgent ? 'Agent' : 'Owner'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Link key={item} href={`/properties/${item}?type=${isAgent ? 'sale' : 'rent'}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer flex flex-col h-full">
                <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                  <div className="absolute top-4 w-full flex justify-between items-start px-4 z-10">
                    <span className="bg-white/95 backdrop-blur-sm text-[#408A71] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm tracking-wide uppercase">
                      {isAgent ? 'For Sale' : 'For Rent'}
                    </span>
                    <span className="bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5">
                      <Clock size={12} /> {item}w ago
                    </span>
                  </div>
                  {/* Mock Image Placeholder */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                     <Home size={40} className="text-gray-300 z-10" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#408A71] transition-colors line-clamp-1 pr-2">
                        Modern Serenity Appt {item}
                      </h3>
                      <div className="text-lg font-extrabold text-[#408A71] shrink-0">
                        {isAgent ? (
                           <>₹{4500000 + item * 500000}</>
                        ) : (
                           <>₹{12000 + item * 2000} <span className="text-sm text-gray-400 font-medium">/mo</span></>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-5 flex items-center gap-1.5 line-clamp-1 font-medium">
                      <MapPin size={16} className="shrink-0 text-gray-400" /> Thondayad Bypass, Kozhikode, Kerala
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-600 text-sm pt-4 border-t border-gray-100 font-medium">
                    <div className="flex items-center gap-1.5"><Building size={16} className="text-gray-400" /> {2 + (item % 2)} Beds</div>
                    <div className="flex items-center gap-1.5"><Key size={16} className="text-gray-400" /> 2 Baths</div>
                    <div className="flex items-center gap-1.5"><Home size={16} className="text-gray-400" /> 1,{item}00 sqft</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
