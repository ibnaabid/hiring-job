"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Menu, X, Search } from "lucide-react";

const navLinks = [
  { label: "Find Jobs",  href: "/jobs" },
  { label: "Add Jobs",  href: "/add" },
  { label: "Salaries",   href: "/salaries" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled ? "bg-[#1E0E4E] shadow-lg shadow-black/20" : "bg-[#2D1B69]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-semibold text-lg tracking-tight flex-shrink-0"
            >
              <span className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center">
                <Briefcase className="text-white w-4 h-4" />
              </span>
              Hire<span className="text-violet-300">Now</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm px-4 py-2 rounded-lg transition-all duration-150 ${
                      active
                        ? "text-white bg-white/10 font-medium"
                        : "text-violet-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-violet-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <Search className="w-4 h-4" />
              </button>
              <span className="w-px h-5 bg-violet-700 mx-1" />
              <Link
                href="/login"
                className="text-sm text-violet-200 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-white bg-violet-500 hover:bg-violet-400 px-4 py-2 rounded-lg transition-all"
              >
              SignUp
              </Link>
            </div>

            {/* Mobile icons */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-violet-300 hover:text-white hover:bg-white/10"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-violet-300 hover:text-white hover:bg-white/10 transition-all"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-violet-800 bg-[#1E0E4E] px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm px-4 py-2.5 rounded-lg transition-all ${
                  pathname === link.href
                    ? "text-white bg-white/10 font-medium"
                    : "text-violet-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-violet-800">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center text-sm text-violet-200 border border-violet-600 py-2.5 rounded-lg hover:bg-white/10 transition-all"
              >
                Log in
              </Link>
              <Link
                href="/post-job"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center text-sm font-medium text-white bg-violet-500 hover:bg-violet-400 py-2.5 rounded-lg transition-all"
              >
                Post a job
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <Search className="text-violet-500 w-4 h-4 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search jobs, companies, skills..."
                className="flex-1 text-sm text-gray-800 outline-none placeholder-gray-400"
              />
              <button onClick={() => setSearchOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-gray-400 mb-2">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {["React Developer", "Next.js", "MERN Stack", "Remote", "Node.js"].map((s) => (
                  <span
                    key={s}
                    className="text-xs px-3 py-1.5 bg-violet-50 text-violet-700 border border-violet-200 rounded-full cursor-pointer hover:bg-violet-100 transition-all"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}