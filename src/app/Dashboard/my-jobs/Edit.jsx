"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Save, X, Pencil } from "lucide-react";

const Edit = ({ job }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const EditHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const updateData = Object.fromEntries(formData.entries());
    const loadingToast = toast.loading("Updating job...");

    try {
      const res = await fetch(`http://localhost:5000/add-job/${job._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (data.modifiedCount > 0) {
        toast.success("Job updated successfully!");
        document.getElementById(`edit_modal_${job._id}`).close();
        router.refresh();
      } else {
        toast.error("No changes found!");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-violet-200 bg-white text-gray-800 text-sm placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all";

  const labelClass = "block text-xs font-semibold text-violet-700 uppercase tracking-wide mb-1.5";

  return (
    <>
      {/* Open Button */}
      <button
        className="btn btn-sm bg-violet-600 hover:bg-violet-500 text-white border-none gap-1.5"
        onClick={() =>
          document.getElementById(`edit_modal_${job._id}`).showModal()
        }
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit
      </button>

      {/* Modal */}
      <dialog
        id={`edit_modal_${job._id}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box w-11/12 max-w-2xl p-0 rounded-3xl overflow-hidden">

          {/* Header */}
          <div className="bg-[#2D1B69] px-6 py-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Edit Job</h3>
              <p className="text-violet-300 text-sm mt-0.5">
                Update your job information
              </p>
            </div>
            <form method="dialog">
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Form Body */}
          <form onSubmit={EditHandler} className="px-6 py-5 space-y-4 bg-white">

            {/* Title */}
            <div>
              <label className={labelClass}>Job Title</label>
              <input
                type="text"
                name="title"
                defaultValue={job?.title}
                placeholder="Enter job title"
                className={inputClass}
                required
              />
            </div>

            {/* Company */}
            <div>
              <label className={labelClass}>Company</label>
              <input
                type="text"
                name="company"
                defaultValue={job?.company}
                placeholder="Enter company name"
                className={inputClass}
                required
              />
            </div>

            {/* Location + Job Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={job?.location}
                  placeholder="e.g. Remote, Dhaka"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Job Type</label>
                <select
                  name="jobType"
                  defaultValue={job?.jobType}
                  className={inputClass}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>

            {/* Salary + Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Salary</label>
                <input
                  type="text"
                  name="salary"
                  defaultValue={job?.salary}
                  placeholder="e.g. ৳30k–৳50k"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  defaultValue={job?.deadline}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                defaultValue={job?.description}
                placeholder="Enter job details..."
                rows={4}
                className={inputClass}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <form method="dialog">
                <button
                  type="submit"
                  className="btn btn-ghost btn-sm text-gray-500"
                  disabled={loading}
                >
                  Cancel
                </button>
              </form>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-sm bg-[#2D1B69] hover:bg-violet-800 text-white border-none gap-2 px-6"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Edit;