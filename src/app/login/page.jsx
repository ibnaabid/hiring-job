"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast"; // Missing import ta add kora holo

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const result = Object.fromEntries(formData.entries());
    console.log(result)

    const { data, error } = await authClient.signIn.email({
        email: result.email,
        password: result.password
    });

    if (error) {
      toast.error(error.message || "Login failed! Check your credentials.");
      return;
    }

    if (data) {
      toast.success("Login successful!");
      router.push("/"); // Login por code dynamic matrix dashboard ba home route-e pathiye dibe
    }
  };

  return (
    // Same Signup page er moto Slate Dark Background layout matching
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      
      {/* Background glow effects consistency dhore rakhar jonno */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Premium Glassmorphic Card */}
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative z-10">

        {/* Text color updated to premium dynamic gradient layout */}
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-slate-400 text-center mb-6 text-sm">
          Login to find your dream job
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            name="email" // FormData target selector fixed
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 outline-none border border-slate-800/80 focus:border-indigo-500/50 transition-all"
            required
          />

          <input
            type="password"
            name="password" // FormData target selector fixed
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 outline-none border border-slate-800/80 focus:border-indigo-500/50 transition-all"
            required
          />

          {/* Indigo layout matched dynamic button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium shadow-lg shadow-indigo-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Login
          </button>

        </form>

        <p className="text-center text-slate-400 text-sm mt-5">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}