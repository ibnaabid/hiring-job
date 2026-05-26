"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

const categories = [
  { label: "Development", icon: "💻" },
  { label: "Design", icon: "🎨" },
  { label: "Marketing", icon: "📢" },
  { label: "Remote", icon: "🌍" },
  { label: "DevOps", icon: "☁️" },
  { label: "Mobile", icon: "📱" },
];

const stats = [
  { icon: Briefcase, num: "12,000+", label: "Active jobs" },
  { icon: Users, num: "4,800+", label: "Companies" },
  { icon: TrendingUp, num: "98%", label: "Success rate" },
];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (query.trim()) params.set("q", query);
    if (location.trim()) params.set("loc", location);

    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative bg-[#2D1B69] pt-20 pb-16 px-4 text-center overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/globe.png"
          alt="hero background"
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">

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
          faster than ever
        </h1>

        <p className="text-violet-300 text-sm sm:text-base mb-8 max-w-md mx-auto">
          Search thousands of jobs from top companies — remote, hybrid, and on-site.
        </p>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-center gap-2 bg-white rounded-2xl p-2 max-w-2xl mx-auto shadow-xl"
        >
          <div className="flex items-center gap-2 flex-1 px-3 w-full">
            <Search className="text-violet-500 w-4 h-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, skill..."
              className="w-full text-sm text-gray-800 outline-none py-2"
            />
          </div>

          <div className="flex items-center gap-2 flex-1 px-3 w-full">
            <MapPin className="text-violet-500 w-4 h-4" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full text-sm text-gray-800 outline-none py-2"
            />
          </div>

          <button
            className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl"
          >
            Search
          </button>
        </form>

        {/* STATS */}
        <div className="flex justify-center gap-10 mt-12">
          {stats.map(({ icon: Icon, num, label }) => (
            <div key={label}>
              <Icon className="text-violet-300 mx-auto mb-1" />
              <div className="text-white font-bold">{num}</div>
              <div className="text-xs text-violet-300">{label}</div>
            </div>
          ))}
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() =>
                router.push(
                  `/jobs?category=${cat.label.toLowerCase()}`
                )
              }
              className="bg-white/10 border border-violet-400/30 text-violet-200 px-4 py-2 rounded-full text-xs hover:bg-white/20"
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}