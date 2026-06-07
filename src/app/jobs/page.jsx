"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  DollarSign,
  CalendarDays,
  Building2,
  Search,
  ArrowUpRight,
  Briefcase
} from "lucide-react";

const MyJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  // 🌐 API থেকে ডেটা ফেচ করা
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/add-job"); 
        if (!res.ok) throw new Error("Failed to fetch jobs");
        
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 🔍 সার্চ, ফিল্টার এবং সর্টিং লজিক
  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    
    let result = [...jobs];

    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      result = result.filter((job) => {
        const titleMatch = job?.title ? job.title.toLowerCase().includes(searchLower) : false;
        const companyMatch = job?.company ? job.company.toLowerCase().includes(searchLower) : false;
        return titleMatch || companyMatch;
      });
    }

    if (category) {
      result = result.filter((job) => job?.category === category);
    }

    if (sort === "salary-high") {
      result.sort((a, b) => {
        const salaryA = parseFloat(String(a?.salary).replace(/[^0-9.]/g, "")) || 0;
        const salaryB = parseFloat(String(b?.salary).replace(/[^0-9.]/g, "")) || 0;
        return salaryB - salaryA;
      });
    }

    if (sort === "salary-low") {
      result.sort((a, b) => {
        const salaryA = parseFloat(String(a?.salary).replace(/[^0-9.]/g, "")) || 0;
        const salaryB = parseFloat(String(b?.salary).replace(/[^0-9.]/g, "")) || 0;
        return salaryA - salaryB;
      });
    }

    if (sort === "latest") {
      result.sort((a, b) => {
        const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    }

    return result;
  }, [jobs, search, category, sort]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-200/30 p-6 md:p-10">
      
      {/* 🌟 হেডার সেকশন */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          My Job Openings
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base font-medium">
          Review, analyze, and manage all your live job postings in one single dashboard.
        </p>
      </div>

      {/* 🔍 প্রিমিয়াম ফিল্টার প্যানেল */}
      <div className="max-w-7xl mx-auto bg-violet-950 backdrop-blur-md p-5 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/60 mb-10">
        <div className="grid md:grid-cols-3 gap-4">
          
          <div className="relative">
            <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all placeholder:text-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all text-slate-600 appearance-none cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Frontend">Frontend Development</option>
            <option value="Backend">Backend Development</option>
            <option value="Full Stack">Full Stack Development</option>
          </select>

          <select
            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all text-slate-600 appearance-none cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort Workspace</option>
            <option value="salary-high">Salary: High to Low</option>
            <option value="salary-low">Salary: Low to High</option>
            <option value="latest">Date Posted: Newest</option>
          </select>
        </div>
      </div>

      {/* 📊 স্ট্যাটস সেকশন */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { title: "Total Openings", count: filteredJobs.length, color: "text-violet-600", bg: "bg-violet-50" },
          { title: "Active Status", count: filteredJobs.length, color: "text-emerald-600", bg: "bg-emerald-50" },
          { title: "Total Applications", count: 148, color: "text-blue-600", bg: "bg-blue-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.title}</p>
              <p className={`text-3xl font-black ${stat.color} mt-1`}>
                {loading ? "..." : stat.count}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <Briefcase className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* ⏳ লোডিং স্টেট */}
      {loading ? (
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-2/3"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="space-y-2 pt-2">
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
              </div>
              <div className="h-11 bg-slate-200 rounded-xl mt-4"></div>
            </div>
          ))}
        </div>
      ) : (
        /* 💼 আল্ট্রা-প্রোফেশনাল জবস গ্রিড */
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job?._id || Math.random()}
              className="group relative bg-white rounded-2xl border border-slate-200/70 p-6 shadow-sm hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* কার্ডের উপরের ছোট গ্রেডিয়েন্ট এফেক্ট (Hover করলে হাইলাইট হবে) */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* কোম্পানি এবং ব্যাজ */}
                <div className="flex justify-between items-start gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 font-bold text-slate-700 text-sm group-hover:bg-violet-50 group-hover:border-violet-200 transition-colors">
                      {job?.company ? job.company.charAt(0) : "J"}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{job?.company || "Unknown Company"}</h4>
                      <p className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md w-fit mt-0.5">{job?.category || "Tech"}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>

                {/* জবের মূল টাইটেল */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors duration-200 tracking-tight line-clamp-1">
                  {job?.title || "Untitled Job Opening"}
                </h3>

                {/* মেটা ইনফরমেশন (লোকেশন, স্যালারি, ডেডলাইন) */}
                <div className="mt-4 space-y-2.5 border-t border-b border-slate-100 py-3.5">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                    <MapPin size={15} className="text-slate-400" />
                    <span className="line-clamp-1">{job?.location || "Remote / Worldwide"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                    <DollarSign size={15} className="text-slate-500" />
                    <span className="text-slate-800">{job?.salary || "Negotiable"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                    <CalendarDays size={15} className="text-slate-400" />
                    <span>Apply before: <strong className="text-slate-700 font-semibold">{job?.deadline || "N/A"}</strong></span>
                  </div>
                </div>

                {/* ডেসক্রিপশন */}
                <p className="mt-4 text-xs leading-relaxed text-slate-400 line-clamp-2">
                  {job?.description || "No description provided for this job role. Click apply to check complete requirements."}
                </p>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="mt-6 pt-2">
                <Link href={`/jobs/${job?._id}`} className="w-full">
                  <button className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-violet-600 text-white font-semibold text-xs tracking-wide py-3 px-4 rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-600/10">
                    View Details & Apply
                    <ArrowUpRight size={14} className="opacity-70 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 📭 ফাকা স্টেট */}
      {!loading && filteredJobs.length === 0 && (
        <div className="text-center py-20 max-w-md mx-auto">
          <div className="w-16 h-16 bg-slate-100 border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">No Matching Jobs</h2>
          <p className="text-slate-400 text-sm mt-2">
            We couldn't find any job posts matching your filter. Try clearing the search or checking other categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyJobsPage;