"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Settings,
  LogOut,
  UserRoundPen,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col">
      
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          JobSphere
        </h1>
        <p className="text-slate-400 text-sm">
          Recruiter Dashboard
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/Dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-900 hover:text-white transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          href="/Dashboard/add-job"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-900 hover:text-white transition"
        >
          <Briefcase size={20} />
          Add Job
        </Link>

        <Link
          href="/Dashboard/my-jobs"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-900 hover:text-white transition"
        >
          <FileText size={20} />
          My Jobs
        </Link>

          <Link
          href="/Dashboard/Company"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-900 hover:text-white transition"
        >
         <UserRoundPen size={20} /> 
Company        </Link>
        
        

        <Link
          href="/Dashboard/applicants"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-900 hover:text-white transition"
        >
          <Users size={20} />
          Applicants
        </Link>

        <Link
          href="/Dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-900 hover:text-white transition"
        >
          <Settings size={20} />
          Settings
        </Link>
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}