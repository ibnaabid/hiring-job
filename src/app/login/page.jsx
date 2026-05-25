"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
  const result = Object.fromEntries(formData.entries());
  console.log(result)

const { data, error } = await authClient.signIn.email({
    email: result.email,
    password: result.password
});

if(data){
  toast.success("login successfull")
}


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-950 via-violet-900 to-purple-800 px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-violet-200 text-center mb-6 text-sm">
          Login to find your dream job
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-violet-300 outline-none border border-white/10"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-violet-300 outline-none border border-white/10"
          />

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-medium transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-violet-200 text-sm mt-5">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-white underline">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}