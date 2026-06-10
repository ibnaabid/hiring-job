"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Sparkles, User, Mail, FileText, Link as LinkIcon } from "lucide-react";

const ApplyClient = ({ job, id, user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isLimitReached = user?.plan === "free" && user?.applyCount >= 3;

  const submitHandle = async (e) => {
    e.preventDefault();

    if (isLimitReached) {
      router.push("/pricing");
      return;
    }

    setLoading(true);
    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      resumeLink: form.resumeLink.value,
      coverLetter: form.coverLetter.value,
      jobId: id,
      jobTitle: job?.title,
      userEmail: user?.email,
    };

    try {
      const res = await fetch("http://localhost:5000/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Application submitted successfully!");
        const newCount = (user?.applyCount || 0) + 1;

        if (newCount >= 3) {
          router.push("/pricing");
        } else {
          router.refresh();
        }
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div>
      {/* 🚫 লিমিট রিচড হলে সুন্দর নোটিফিকেশন অ্যালার্ট */}
      {isLimitReached && (
        <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl mb-5 text-center">
          <h2 className="text-red-400 font-bold text-lg flex items-center justify-center gap-2">
            Free Limit Reached
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            You already used all 3 free applications.
          </p>
          <button
            onClick={() => router.push("/pricing")}
            className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
          >
            <Sparkles size={16} />
            Upgrade Plan
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* 💼 মেইন প্রিমিয়াম ডার্ক ফর্ম */}
      {!isLimitReached && (
        <form onSubmit={submitHandle} className="space-y-5">
          
          {/* রাইট কর্নারে রিমেইনিং কাউন্টার */}
          <div className="flex justify-end mb-2">
            <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Applications Used:</span>
              <span className="text-xs font-bold text-amber-400">{user?.applyCount || 0} / 3</span>
            </div>
          </div>

          {/* ১. নাম ইনপুট */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <User size={14} className="text-violet-400" /> Full Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={user?.name || ""}
              placeholder="John Doe"
              required
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300"
            />
          </div>

          {/* ২. ইমেইল ইনপুট */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <Mail size={14} className="text-violet-400" /> Email Address
            </label>
            <input
              name="email"
              type="email"
              defaultValue={user?.email || ""}
              placeholder="john@example.com"
              required
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300"
            />
          </div>

          {/* ৩. রিজিউম লিংক ইনপুট */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <LinkIcon size={14} className="text-violet-400" /> Resume Link (Drive / Dropbox)
            </label>
            <input
              name="resumeLink"
              type="url"
              placeholder="https://drive.google.com/..."
              required
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300"
            />
          </div>

          {/* ৪. কভার লেটার */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <FileText size={14} className="text-violet-400" /> Cover Letter / Summary
            </label>
            <textarea
              name="coverLetter"
              rows="4"
              placeholder="Why are you a great fit for this job..."
              required
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300 resize-none"
            />
          </div>

          {/* ৫. ডাইনামিক সাবমিট বাটন */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shadow-lg shadow-violet-600/10"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
          
        </form>
      )}
    </div>
  );
};

export default ApplyClient;