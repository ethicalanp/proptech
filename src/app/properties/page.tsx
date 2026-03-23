"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Home, Building, Key, Clock, Filter, ChevronDown, SlidersHorizontal, Check } from "lucide-react";

export default function PropertiesPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [listingType, setListingType] = useState<"rent" | "sale">("rent");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-grow">
        
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Explore Properties</h1>
            <p className="text-gray-500 mt-2 text-lg">Find your perfect home from our curated selection.</p>
          </div>
          
          {/* Buy / Rent Toggle */}
          <div className="flex bg-gray-200/60 p-1.5 rounded-xl self-start sm:self-auto shadow-inner">
            <button 
              onClick={() => setListingType("rent")}
              className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${
                listingType === "rent" ? "bg-white text-[#408A71] shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              For Rent
            </button>
            <button 
              onClick={() => setListingType("sale")}
              className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${
                listingType === "sale" ? "bg-white text-[#408A71] shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              For Sale
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <button 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl font-medium shadow-sm active:scale-95 transition-all text-gray-700 hover:text-gray-900"
            >
              <SlidersHorizontal size={18} /> Filters
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium bg-white px-4 py-2.5 border border-gray-200 rounded-xl shadow-sm">
              Sort by: <span className="text-gray-900 font-semibold flex items-center gap-1">Recommended <ChevronDown size={14} /></span>
            </div>
          </div>

          {/* Left Sidebar - Filters */}
          <aside className={`w-full lg:w-72 flex-shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                  <Filter size={20} className="text-[#408A71]" /> Filters
                </h2>
                <button className="text-sm text-[#408A71] font-semibold hover:underline">Reset All</button>
              </div>

              {/* Location Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Location</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="City, neighborhood..." 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#408A71] focus:border-transparent outline-none transition-all text-sm font-medium" 
                  />
                </div>
              </div>

              <hr className="border-gray-100 my-6" />

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Property Type</label>
                <div className="flex flex-col gap-3">
                  {['Apartment', 'House', 'Villa', 'Commercial'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 border-gray-300 group-hover:border-[#408A71] transition-colors">
                        <input type="checkbox" className="peer sr-only" defaultChecked={type === 'Apartment'} />
                        <div className="scale-0 peer-checked:scale-100 transition-transform bg-[#408A71] w-full h-full rounded-sm flex items-center justify-center text-white">
                          <Check size={12} strokeWidth={4} />
                        </div>
                      </div>
                      <span className="text-gray-600 font-medium text-sm group-hover:text-gray-900 transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 my-6" />

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Price Range (₹)</label>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <input type="number" placeholder="Min" defaultValue="5000" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-[#408A71] outline-none" />
                  </div>
                  <span className="text-gray-400 font-medium">-</span>
                  <div className="flex-1">
                    <input type="number" placeholder="Max" defaultValue="50000" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-[#408A71] outline-none" />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 my-6" />

              {/* Rooms */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">Bedrooms</label>
                <div className="flex items-center gap-2">
                  {['1', '2', '3', '4+'].map((num) => (
                    <button key={num} className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${num === '2' ? 'bg-[#408A71] text-white shadow-md' : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'}`}>
                      {num}
                    </button>
                  ))}
                </div>
              </div>

               {/* Apply Button */}
               <button className="w-full bg-[#408A71] hover:bg-[#34745c] text-white font-semibold py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center mt-8">
                Apply Filters
               </button>
            </div>
          </aside>

          {/* Right Content - Properties Grid */}
          <div className="flex-1">
            {/* Top Bar - Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <p className="text-gray-600 font-medium">Showing <span className="font-bold text-gray-900">12</span> properties</p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-500">Sort by:</span>
                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-gray-900 shadow-sm transition-all group-hover:border-[#408A71]">
                    Recommended <ChevronDown size={14} className="text-gray-400 group-hover:text-[#408A71] transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            {/* Properties List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Link key={item} href={`/properties/${item}?type=${listingType}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer flex flex-col h-full">
                  <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                    <div className="absolute top-4 w-full flex justify-between items-start px-4 z-10">
                      <span className="bg-white/95 backdrop-blur-sm text-[#408A71] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm tracking-wide uppercase">
                        {listingType === "rent" ? "For Rent" : "For Sale"}
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
                          {listingType === "rent" ? (
                            <>₹{12000 + item * 2000} <span className="text-sm text-gray-400 font-medium">/mo</span></>
                          ) : (
                            <>₹{4500000 + item * 500000}</>
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

            {/* Pagination / Load More */}
            <div className="mt-12 flex justify-center">
              <button className="bg-white border-2 border-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:border-[#408A71] hover:text-[#408A71] transition-all shadow-sm active:scale-95">
                Load More Properties
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
