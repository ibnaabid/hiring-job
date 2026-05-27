
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";


const Job = async() => {

    const res = await fetch("http://localhost:5000/add",{
        cache:"no-store"
    })
    const data = await res.json();
    console.log(data)

    return (
        <div>
            <div className="w-full bg-slate-950 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Section Header */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Available Opportunities
                        </h2>
                        <p className="text-sm text-slate-400">
                            Explore high-paying tech jobs dynamically fetched from your database.
                        </p>
                    </div>

                    {/* 2. CARD CONTAINER GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            data && data.map((job) => (
                                <div 
                                    key={job._id} 
                                    className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
                                >
                                    {/* Gradient Glow Effect on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="space-y-4 relative z-10">
                                        {/* Top Row: Title & Badges */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-start justify-between gap-2">
                                                <Image
    src={job.image}
    height={500}
    width={500}
    alt="company"
    className="rounded-full border border-slate-700"
  />
                                                {/* Bug Fixed: Changed 'data.title' to 'job.title' */}
                                                <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                                                    {job.title || "Job Position"}
                                                </h3>
                                                {/* Bug Fixed: Changed 'data.type' to 'job.type' */}
                                                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full shrink-0">
                                                    {job.type || "Full-Time"}
                                                </span>
                                            </div>
                                            {/* Bug Fixed: Changed 'data.company' to 'job.company' */}
                                            <p className="text-xs text-green-400 font-medium">
                                                {job.company || "Company Name"}
                                            </p>
                                             <p className="text-xs text-slate-200 font-medium">
                                                {job.description || "Company Name"}
                                            </p>
                                        </div>

                                        {/* Middle Row: Short Info (Salary, Location, etc.) */}
                                        <div className="flex items-center gap-4 text-xs font-mono py-1 border-y border-slate-800/60 text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <span className="text-emerald-400">💰</span> 
                                                {/* Bug Fixed: Changed 'data.salary' to 'job.salary' */}
                                                <span className="text-slate-200 font-medium">{job.salary || "Negotiable"}</span>
                                            </div>
                                            <div className="w-1 h-1 bg-slate-700 rounded-full" />
                                            <div className="flex items-center gap-1">
                                                {/* Bug Fixed: Changed 'data.location' to 'job.location' */}
                                                <span>📍</span> {job.location || "Remote"}
                                            </div>
                                        </div>

                                        {/* Bottom Row: Dynamic Tags / Skills */}
                                        {/* Bug Fixed: Changed 'data.tags' to 'job.tags' */}
                                        {job.tags && (
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {job.tags.map((tag, idx) => (
                                                    <span 
                                                        key={idx} 
                                                        className="text-[10px] px-2.5 py-1 bg-slate-950 text-slate-400 border border-slate-900 rounded-lg font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                  <div className="mt-6 pt-2 relative z-10">
   <Link href={`/jobs/${job?._id}`}>
          <button className="mt-2 w-full py-2 rounded-lg border border-teal-500/30 
          text-teal-400 text-xs font-medium hover:bg-teal-500/10 transition-all">
            View Job
          </button>
        </Link>
</div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Empty State Handler */}
                    {(!data || data.length === 0) && (
                        <div className="text-center py-12 text-sm text-slate-500 font-mono">
                            No active job opportunities found at this moment.
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Job;