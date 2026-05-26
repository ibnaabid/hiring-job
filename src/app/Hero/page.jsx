"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Briefcase, Users, TrendingUp } from "lucide-react";

const categories = [
  { label: "Development", icon: "💻" },
  { label: "Design",      icon: "🎨" },
  { label: "Marketing",   icon: "📢" },
  { label: "Remote",      icon: "🌍" },
  { label: "DevOps",      icon: "☁️" },
  { label: "Mobile",      icon: "📱" },
];

const stats = [
  { icon: Briefcase,   num: "12,000+", label: "Active jobs"  },
  { icon: Users,       num: "4,800+",  label: "Companies"    },
  { icon: TrendingUp,  num: "98%",     label: "Success rate" },
];

export default function Hero() {
  const [query,    setQuery]    = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim())    params.set("q", query);
    if (location.trim()) params.set("loc", location);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="bg-[#2D1B69] pt-16 pb-12 px-4 text-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white/10 border border-violet-400/30 text-violet-200 text-xs px-4 py-1.5 rounded-full mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        1,200+ new jobs added this week
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 max-w-2xl mx-auto">
        Find your{" "}
        <span className="text-violet-300 underline decoration-violet-500/40 underline-offset-4">
          dream job
        </span>{" "}
        <br className="hidden sm:block" />
        faster than ever
      </h1>
      <p className="text-violet-300 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
        Search thousands of jobs from top companies — remote, hybrid, and on-site.
        Your next opportunity is one click away.
      </p>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-center gap-2 bg-white rounded-2xl p-2 max-w-2xl mx-auto shadow-xl shadow-black/20"
      >
        <div className="flex items-center gap-2 flex-1 px-3 w-full">
          <Search className="text-violet-400 w-4 h-4 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, skill, or keyword..."
            className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none py-2"
          />
        </div>
        <span className="hidden sm:block w-px h-8 bg-gray-200" />
        <div className="flex items-center gap-2 flex-1 px-3 w-full">
          <MapPin className="text-violet-400 w-4 h-4 flex-shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location or Remote"
            className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-7 py-3 rounded-xl transition-all"
        >
          Search
        </button>
      </form>

      {/* Quick tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        <span className="text-xs text-violet-400">Popular:</span>
        {["React", "Next.js", "Node.js", "Remote", "Full-time"].map((tag) => (
          <button
            key={tag}
            onClick={() => setQuery(tag)}
            className="text-xs text-violet-300 hover:text-white border border-violet-600 hover:border-violet-400 px-3 py-1 rounded-full transition-all"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-10 mt-12">
        {stats.map(({ icon: Icon, num, label }) => (
          <div key={label} className="text-center">
            <div className="flex justify-center mb-1">
              <Icon className="text-violet-400 w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-white">{num}</div>
            <div className="text-xs text-violet-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap justify-center gap-2 mt-10">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => router.push(`/jobs?category=${cat.label.toLowerCase()}`)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-violet-500/30 hover:border-violet-400 text-violet-200 hover:text-white text-xs px-4 py-2 rounded-full transition-all"
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

    </section>
  );
}