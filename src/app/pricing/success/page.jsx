import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import Link from "next/link";
import { CheckCircle2, Mail, ArrowRight, Sparkles, Crown } from "lucide-react";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    // ✅ closing bracket ঠিক করা হয়েছে
    await fetch("http://localhost:5000/update-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: customerEmail,
        plan: "premium",
      }),
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
        <div className="relative max-w-md w-full bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl text-center overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-green-400 via-violet-500 to-indigo-500 rounded-t-3xl" />

          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-3">
            <Crown className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Premium Activated</span>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Payment Successful! 🎉
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            আপনার Premium plan সফলভাবে activate হয়েছে। এখন unlimited job apply করুন!
          </p>

          <div className="mt-6 bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Confirmation sent to</p>
              <p className="text-sm font-bold text-white mt-0.5">{customerEmail}</p>
            </div>
          </div>

          <div className="mt-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-left space-y-2">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" /> Unlocked Features
            </p>
            {[
              "Unlimited Job Applications",
              "Priority Profile Listing",
              "Instant Match Analytics",
              "Resume Boost Feature",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>

          <Link href="/jobs" className="block mt-6">
            <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-violet-500/20">
              Start Applying Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>

          <p className="text-[11px] text-slate-600 mt-4">
            কোনো সমস্যা?{" "}
            <a href="mailto:orders@example.com" className="text-violet-400 hover:text-violet-300 transition-colors">
              orders@example.com
            </a>
          </p>
        </div>
      </div>
    );
  }
}