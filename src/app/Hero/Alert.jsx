// import React from 'react';

import Link from "next/link";

const Alert = () => {
    return (
        <div>
            <h2 className="text-center text-lime-400 text-3xl font-bold">Apply Now</h2>
            {/* DUAL CTA SECTION */}
<section className="grid mt-8 mx-auto px-6 mb-6 grid-cols-1 md:grid-cols-2 gap-6">
  {/* Candidate Card */}
  <div className="rounded-3xl bg-gradient-to-br from-indigo-950/40 to-slate-900/50 border border-indigo-500/10 p-8 flex flex-col justify-between items-start relative overflow-hidden group">
    <div className="space-y-3 max-w-sm z-10">
      <h3 className="text-xl font-bold text-slate-100">Looking for a career shift?</h3>
      <p className="text-xs text-slate-400 leading-relaxed">Create your profile, upload your customized portfolio link, and get headhunted by recruiters directly.</p>
    </div>
    
    <Link href="/jobs">
    <button className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition duration-300">
      Apply as Candidate
    </button></Link>
  </div>

  {/* Recruiter Card */}
  <div className="rounded-3xl bg-gradient-to-br from-purple-950/40 to-slate-900/50 border border-purple-500/10 p-8 flex flex-col justify-between items-start relative overflow-hidden group">
    <div className="space-y-3 max-w-sm z-10">
      <h3 className="text-xl font-bold text-slate-100">Are you hiring talent?</h3>
      <p className="text-xs text-slate-400 leading-relaxed">Post requirements, track applicant submissions directly using our built-in dashboards filtering system.</p>
    </div>
   <Link href="/add">
    <button className="mt-6 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-purple-600/20 transition duration-300">
      Post a Job Now
    </button></Link>
  </div>
</section>
        </div>
    );
};

export default Alert;