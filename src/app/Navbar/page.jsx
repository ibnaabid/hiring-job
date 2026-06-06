"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Briefcase, Menu, X } from "lucide-react";
import { authClient } from "../lib/auth-client";
import Image from "next/image";

const navLinks = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Add Jobs", href: "/add" },
  { label: "Apply", href: "/apply" },
    { label: "Dashboard", href: "/Dashboard" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  // Scroll Effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Load Session
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

  // Logout
  const logoutHandler = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.log(error);
      return;
    }

    setSession(null);

    router.refresh();
    router.push("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-[#1E0E4E] shadow-lg shadow-black/20"
          : "bg-[#2D1B69]"
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

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-2">
            <span className="w-px h-5 bg-violet-700 mx-1" />

            {loading ? (
              <p className="text-violet-200 text-sm">Loading...</p>
            ) : session?.user ? (
              <div className="flex items-center gap-3">
                <span className="text-white text-sm px-3 py-1 bg-white/10 rounded-lg">
                  {session.user.name}
                </span>

           {session?.user?.image ? (
  <Image
    src={session?.user?.image}
    alt="user"
    width={40}
    height={40}
    className="rounded-full border-2 border-violet-400"
  />
) : (
  // image না থাকলে name এর first letter দেখাবে
  <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold text-sm border-2 border-violet-400">
    {session.user.name?.[0]?.toUpperCase()}
  </div>
)}

                <button
                  onClick={logoutHandler}
                  className="btn btn-error text-white"
                >
                  Log Out
                </button>
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
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex items-center justify-center text-violet-300"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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

          {!loading && !session?.user && (
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/login"
                className="text-center text-white bg-violet-500 py-2 rounded-lg"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="text-center text-white bg-violet-700 py-2 rounded-lg"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}