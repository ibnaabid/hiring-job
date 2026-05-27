

const Company = () => {
    return (
        <div>
            {/* COMPANY LOGOS & STATS COUUNTER */}
<section className="space-y-10 py-12">
  {/* Logos */}
  <div className="text-center space-y-4">
    <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
      Trusted by tech engineering teams worldwide
    </p>
    <div className="flex flex-wrap gap-8 justify-center items-center opacity-40 grayscale hover:grayscale-0 transition duration-500 text-xl font-bold text-slate-300 select-none">
      <span>GOOGLE</span>
      <span>META</span>
      <span>VERCEL</span>
      <span>STRIPE</span>
      <span>NETFLIX</span>
    </div>
  </div>

  {/* Stats Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/20 border border-slate-900 rounded-3xl p-8 backdrop-blur-sm">
    {[
      { value: "12K+", label: "Active Jobs" },
      { value: "850+", label: "Top Companies" },
      { value: "30K+", label: "Candidates" },
      { value: "98%", label: "Success Rate" }
    ].map((stat, i) => (
      <div key={i} className="text-center space-y-1">
        <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          {stat.value}
        </div>
        <div className="text-xs sm:text-sm text-slate-400 font-medium">{stat.label}</div>
      </div>
    ))}
  </div>
</section>
            
        </div>
    );
};

export default Company;