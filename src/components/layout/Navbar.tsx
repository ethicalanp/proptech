"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-[#408A71] text-white p-2 rounded-xl group-hover:bg-[#34745c] transition-colors shadow-md">
            <Building2 size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            prop<span className="text-[#408A71]">tech</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  isActive ? "text-[#408A71]" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[26px] left-0 right-0 h-1 bg-[#408A71] rounded-t-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            Log In
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-2 bg-[#408A71] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#34745c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium p-3 rounded-lg transition-colors ${
                    pathname === link.href
                      ? "bg-green-50 text-[#408A71]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-gray-100 my-2" />
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-[#408A71] text-white p-3 rounded-xl text-center text-lg font-semibold shadow-md active:scale-95 transition-all"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
