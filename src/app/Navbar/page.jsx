"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Menu, X, Search } from "lucide-react";
import { authClient } from "../lib/auth-client";
import Image from "next/image";

const navLinks = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Add Jobs", href: "/add" },
  { label: "Salaries", href: "/salaries" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  // scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // session load
  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data, error } = await authClient.getSession();

        if (error) {
          setSession(null);
        } else {
          setSession(data || null);
        }
      } catch (err) {
        console.log("Session error:", err);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
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
              className="flex items-center gap-2 text-white font-semibold text-lg"
            >
              <span className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
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
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      active
                        ? "text-white bg-white/10"
                        : "text-violet-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-2">

              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center text-violet-300 hover:text-white hover:bg-white/10 rounded-lg"
              >
                <Search className="w-4 h-4" />
              </button>

              <span className="w-px h-5 bg-violet-700 mx-1" />

              {/* SESSION UI */}
              {loading ? (
                <p className="text-violet-200 text-sm">Loading...</p>
              ) : session?.user ? (
                <div className="flex items-center gap-2">

                  <span className="text-white text-sm px-3 py-1 bg-white/10 rounded-lg">
                    {session.user.name}
                  </span>

                  {session.user.image && (
                    <Image
                      src={session.user.image || ""}
                      height={40}
                      width={40}
                      alt="user"
                      className="rounded-full"
                    />
                  )}

                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm text-violet-200 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10"
                  >
                    Login
                  </Link>

                  <Link
                    href="/signup"
                    className="text-sm font-medium text-white bg-violet-500 hover:bg-violet-400 px-4 py-2 rounded-lg"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center text-violet-300"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 flex items-center justify-center text-violet-300"
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-[#1E0E4E] border-t border-violet-800 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-violet-300 hover:text-white hover:bg-white/10 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-start justify-center pt-24 px-4 z-[100]"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 p-3 border-b">
              <Search className="w-4 h-4 text-violet-500" />
              <input
                autoFocus
                placeholder="Search jobs..."
                className="flex-1 outline-none text-sm"
              />
              <button onClick={() => setSearchOpen(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}