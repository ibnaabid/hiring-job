import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { Crown, ShieldCheck, Zap, Sparkles, ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    priceId: "price_1TgaiHF5B8niuzqeZvLHnNzD", 
    mode: "subscription",// Stripe dashboard থেকে Basic plan এর price ID দাও
    period: "/ month",
    description: "Job seekers just getting started",
    features: [
      "Up to 10 applications/month",
      "Basic profile listing",
      "Email support",
    ],
    cta: "Get Basic",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$70.00",
    priceId: "price_1TgaiHF5B8niuzqeZvLHnNzD", // ✅ তোমার Stripe Premium price ID
    period: "one-time",
    mode:"payment",
    description: "For serious job hunters",
    features: [
      "Unlimited applications",
      "Priority profile listing",
      "Instant match analytics",
      "Dedicated support",
      "Resume boost feature",
    ],
    cta: "Get Premium",
    highlight: true,
  },
];

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-6">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full mb-4">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Upgrade Your Plan</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Apply Without{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Limits
          </span>
        </h1>
        <p className="text-slate-400 mt-3 text-sm max-w-md mx-auto">
          {session?.user?.name ? `${session.user.name}, ফ্রি` : "ফ্রি"} প্ল্যানের ৩টি application শেষ। আরও apply করতে একটি plan বেছে নিন।
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl p-7 border flex flex-col gap-5 transition-all duration-300 ${
              plan.highlight
                ? "bg-gradient-to-b from-violet-600/20 to-slate-900 border-violet-500/40 shadow-2xl shadow-violet-500/10"
                : "bg-white/[0.02] border-white/10"
            }`}
          >
            {/* Top gradient bar — শুধু Premium এ */}
            {plan.highlight && (
              <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-3xl bg-gradient-to-r from-amber-500 via-violet-500 to-indigo-500" />
            )}

            {/* Most Popular badge — শুধু Premium এ */}
            {plan.highlight && (
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Most Popular
              </div>
            )}

            {/* Plan name, price, description */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{plan.name}</p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-slate-400 text-sm mb-1">{plan.period}</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">{plan.description}</p>
            </div>

            {/* Features list */}
            <ul className="space-y-2.5 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                    plan.highlight ? "bg-violet-500/20 text-violet-400" : "bg-white/5 text-slate-400"
                  }`}>
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            {/* Checkout form — priceId hidden input দিয়ে POST করে */}
            <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="priceId" value={plan.priceId} />
              <input type="hidden" name="mode" value={plan.mode} />
              <button
                type="submit"
                className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {plan.highlight && <Crown className="w-4 h-4" />}
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-violet-400" /> Secure Payment
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-violet-400" /> Instant Activation
          </span>
        </div>
        <Link href="/" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
          ← Back to Home
        </Link>
      </div>

    </div>
  );
};

export default page;