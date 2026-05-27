"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

const AddJobs = () => {
const router = useRouter()
  const handleAddJob = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const result = Object.fromEntries(formData.entries());

    const res = await fetch("http://localhost:5000/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });

    console.log(result);
    toast.success("Add Jobs successfully")
    
    router.refresh()

   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative z-10">

        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent text-center mb-2">
          Add Jobs Title
        </h1>

        <p className="text-slate-400 text-center mb-6 text-sm">
          Start your career journey
        </p>
        <form onSubmit={handleAddJob} className="space-y-4">

  <input
    type="text"
    name="title"
    placeholder="Job Title"
    className="w-full px-4 py-3 rounded-xl bg-slate-950"
  />

  <input
    type="text"
    name="company"
    placeholder="Company Name"
    className="w-full px-4 py-3 rounded-xl bg-slate-950"
  />

  <input
    type="text"
    name="location"
    placeholder="Location"
    className="w-full px-4 py-3 rounded-xl bg-slate-950"
  />

  <input
    type="number"
    name="salary"
    placeholder="Salary"
    className="w-full px-4 py-3 rounded-xl bg-slate-950"
  />

  <input
    type="text"
    name="image"
    placeholder="Company Logo URL"
    className="w-full px-4 py-3 rounded-xl bg-slate-950"
  />

  <textarea
    name="description"
    placeholder="Job Description"
    className="w-full px-4 py-3 rounded-xl bg-slate-950"
  />

  <p className="flex gap-3 mt-2 px-3">
    Already see Some JObs? 
       <Link className="text-red-900 font-bold hover:text-blue-600" href="/jobs">Find Jobs</Link>
   
  </p>


  <button
    type="submit"
    className="w-full bg-indigo-600 text-white py-3 rounded-xl"
  >
    Add Job
  </button>

</form>

      


      </div>

    </div>
  );
};

export default AddJobs;