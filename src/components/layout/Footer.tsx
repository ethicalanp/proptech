import Link from "next/link";
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-[#408A71] text-white p-2 rounded-xl group-hover:bg-[#34745c] transition-colors shadow-md">
                <Building2 size={24} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                prop<span className="text-[#408A71]">tech</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Find your dream home with ease. We provide the best properties at the most affordable prices.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="hover:text-[#408A71] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-[#408A71] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-[#408A71] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#408A71] transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 mb-2">Quick Links</h3>
            <Link href="/properties" className="text-sm text-gray-500 hover:text-[#408A71] transition-colors">Buy Property</Link>
            <Link href="/rent" className="text-sm text-gray-500 hover:text-[#408A71] transition-colors">Rent Property</Link>
            <Link href="/sell" className="text-sm text-gray-500 hover:text-[#408A71] transition-colors">Sell Property</Link>
            <Link href="/agents" className="text-sm text-gray-500 hover:text-[#408A71] transition-colors">Our Agents</Link>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
            <Link href="/faq" className="text-sm text-gray-500 hover:text-[#408A71] transition-colors">FAQ</Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-[#408A71] transition-colors">Contact Us</Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#408A71] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-[#408A71] transition-colors">Terms of Service</Link>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#408A71] mt-0.5 shrink-0" />
              <p className="text-sm text-gray-500">123 Proptech Ave,<br/>Suite 100, New York, NY 10001</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-[#408A71] shrink-0" />
              <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-[#408A71] shrink-0" />
              <p className="text-sm text-gray-500">hello@proptech.com</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Proptech. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-gray-600 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
