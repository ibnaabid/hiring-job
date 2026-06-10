import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import ApplyClient from "./ApplyClient";
import Link from "next/link";
import { Crown, ShieldCheck, Zap, ArrowRight } from "lucide-react";

const Apply = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-semibold">
        <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl shadow-xl">
          Please Login First to Access this Page.
        </div>
      </div>
    );
  }

  const jobRes = await fetch(`http://localhost:5000/jobs/${id}`, {
    cache: "no-store",
  });
  const job = await jobRes.json();

  const applyRes = await fetch(
    `http://localhost:5000/apply/${session.user.email}`,
    { cache: "no-store" }
  );
  const applications = await applyRes.json();

  const user = {
    ...session.user,
    applyCount: applications?.length || 0,
    plan: session.user.plan || "free", // ✅ DB থেকে real plan
  };

  const isBlocked = user.plan === "free" && user.applyCount >= 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-10 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      {isBlocked ? (
        <div className="relative max-w-md w-full bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl text-center overflow-hidden group z-10">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-amber-500 via-violet-500 to-indigo-500" />
          
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/5 relative">
            <Crown className="w-8 h-8 text-amber-400 animate-bounce" style={{ animationDuration: '3s' }} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            Upgrade to Premium
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            আপনি ফ্রি প্ল্যানের সর্বোচ্চ লিমিট <span className="font-bold text-amber-400">(3/3)</span> শেষ করেছেন। অবিরাম যেকোনো জবে অ্যাপ্লাই করতে আজই প্রিমিয়ামে যোগ দিন।
          </p>

          <div className="mt-6 space-y-3 bg-white/[0.01] p-4 rounded-2xl border border-white/5 text-left">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-violet-400" />
              <span>Unlimited Job Applications</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-300">
              <Zap className="w-4 h-4 text-violet-400" />
              <span>Instant Profile Match & Analytics</span>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/pricing" className="block w-full">
              <button className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm tracking-wide py-4 px-6 rounded-2xl shadow-xl shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                Buy Premium Plan
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>

          <p className="text-[10px] text-slate-500 mt-4 font-medium uppercase tracking-wider">
            Cancel or downgrade anytime
          </p>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="border-b border-white/5 pb-4 mb-6">
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 px-2.5 py-1 rounded-md">
              Applying for
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-2 tracking-tight">
              {job?.title || "Loading Job..."}
            </h1>
          </div>
          <ApplyClient job={job} id={id} user={user} />
        </div>
      )}
    </div>
  );
};

export default Apply;