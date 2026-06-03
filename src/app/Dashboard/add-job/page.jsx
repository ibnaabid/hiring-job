"use client";

import { useState } from "react";
import { Briefcase } from "lucide-react";
import toast from "react-hot-toast";

const AddJob = () => {
  const [loading, setLoading] = useState(false);

  const handleAddJob = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/add-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();
console.log(data)
      if (res.ok) {
        toast.success("Job Posted Successfully 🚀");
        e.target.reset();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-indigo-500/20">
            <Briefcase className="text-indigo-400" size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              Create New Job
            </h1>
            <p className="text-slate-400">
              Publish a premium job opportunity
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleAddJob} className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <input name="title" placeholder="Job Title"
              className="input" />
            <input name="company" placeholder="Company Name"
              className="input" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input name="logo" placeholder="Company Logo URL"
              className="input" />
            <input name="location" placeholder="Location"
              className="input" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <select name="jobType" className="input">
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Remote</option>
              <option>Internship</option>
            </select>

            <input name="salary" placeholder="Salary"
              className="input" />

            <input type="date" name="deadline"
              className="input" />
          </div>

          <textarea name="description" placeholder="Job Description"
            className="input" />

          <textarea name="requirements" placeholder="Requirements"
            className="input" />

          <textarea name="responsibilities" placeholder="Responsibilities"
            className="input" />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:scale-[1.02] transition"
          >
            {loading ? "Posting..." : "Publish Job 🚀"}
          </button>

        </form>
      </div>

      {/* small reusable style */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: #1e293b;
          border: 1px solid #334155;
          color: white;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
        }
      `}</style>

    </div>
  );
};

export default AddJob;