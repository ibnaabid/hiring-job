"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { auth } from "../lib/auth";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup =async (e) => {
    e.preventDefault();

  const formData = new FormData(e.target);
  const result = Object.fromEntries(formData.entries());
  console.log(result)

const { data, error } = await authClient.signUp.email({
    name:result.name,
    email: result.email,
    password: result.password,
    image: result.imageurl

});

if(data){
  toast.success("signup successfull")
}
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-950 via-violet-900 to-purple-800 px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-violet-200 text-center mb-6 text-sm">
          Start your career journey
        </p>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-violet-300 outline-none border border-white/10"
          />

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
       <input
  type="text"
  placeholder="image url"
  value={image}
  onChange={(e) => setImag(e.target.value)}
  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-violet-300 outline-none border border-white/10"
/>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-xl font-medium transition"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center text-violet-200 text-sm mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-white underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}