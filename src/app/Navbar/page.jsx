"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        {/* Logo */}

        <h1 className="text-2xl font-bold text-violet-700">
          JobPortal
        </h1>

        {/* Menu */}

        <div className="hidden md:flex gap-8 font-medium">

          <Link
            href="/"
            className="hover:text-violet-700 transition"
          >
            Home
          </Link>

          <Link
            href="/jobs"
            className="hover:text-violet-700 transition"
          >
            Jobs
          </Link>

          <Link
            href="/companies"
            className="hover:text-violet-700 transition"
          >
            Companies
          </Link>

          <Link
            href="/about"
            className="hover:text-violet-700 transition"
          >
            About
          </Link>

        </div>

        {/* Button */}

        <button
          className="
          bg-violet-700
          text-white
          px-5
          py-2
          rounded-lg
          hover:bg-violet-800
          transition
          "
        >
          Login
        </button>

      </div>
    </nav>
  );
}