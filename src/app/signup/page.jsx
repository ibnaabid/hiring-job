"use client";

import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const result = Object.fromEntries(formData.entries());

    console.log(result);

    const { data, error } = await authClient.signUp.email({
      name: result.name,
      email: result.email,
      password: result.password,
      image: result.imageurl,
      role: "admin"
    });

    if (error) {
      toast.error(error.message || "Signup Failed");
      return;
    }

    if (data) {
      toast.success("Signup Successful");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative z-10">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent text-center mb-2">
          Create Account
        </h1>

        <p className="text-slate-400 text-center mb-6 text-sm">
          Start your career journey
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 outline-none border border-slate-800/80 focus:border-indigo-500/50 transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 outline-none border border-slate-800/80 focus:border-indigo-500/50 transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 outline-none border border-slate-800/80 focus:border-indigo-500/50 transition-all"
          />

          <input
            type="text"
            name="imageurl"
            placeholder="Image URL"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 text-slate-100 placeholder-slate-500 outline-none border border-slate-800/80 focus:border-indigo-500/50 transition-all"
          />

          <div className="flex flex-col gap-3">
            <Label className="text-slate-300">Select Role</Label>

            <RadioGroup
              name="role"
              defaultValue="user"
              orientation="horizontal"
            >
              <Radio value="user">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>

                <Radio.Content>
                  <Label>User</Label>
                  <Description>Apply for jobs</Description>
                </Radio.Content>
              </Radio>

              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>

                <Radio.Content>
                  <Label>Recruiter</Label>
                  <Description>Post jobs</Description>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium shadow-lg shadow-indigo-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-5">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}