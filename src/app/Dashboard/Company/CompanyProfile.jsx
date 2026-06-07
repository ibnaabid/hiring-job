"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
// 🛠️ সব আইকন শুধুমাত্র lucide-react থেকে নেওয়া হয়েছে (Linkedin এবং Facebook সহ)
import { 
  Save, 
  Globe, 
  Phone, 
  Mail, 
  MapPin,  
  Building2, 
  Users, 
  // Linkedin,
  // Facebook,
  Image as ImageIcon
} from "lucide-react";

const CompanyProfile = ({ company: initialCompany, session }) => {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(initialCompany);
  const [logo, setLogo] = useState(initialCompany?.logo || "");

  useEffect(() => {
    setCompany(initialCompany);
    setLogo(initialCompany?.logo || "");
  }, [initialCompany]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const updateData = {
      ...Object.fromEntries(formData.entries()),
      recruiterName: session?.user?.name,
      recruiterId: session?.user?.id,
    };

    const loadingToast = toast.loading("Saving profile changes...");

    try {
      const res = await fetch("http://localhost:5000/Company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (data.insertedId || data.modifiedCount > 0 || data.acknowledged || res.ok) {
        toast.success("Profile saved and updated successfully!");
        setCompany(updateData);
      } else {
        toast.error("No changes were saved!");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const inputContainerClass = "flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200 focus-within:bg-white transition-all duration-300";
  const inputClass = "w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400";
  const labelClass = "text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen bg-gray-50/50">
      <div className="bg-white border border-gray-100 shadow-2xl rounded-[2rem] overflow-hidden transition-all duration-300">

        {/* 💜 হেডার ব্যানার */}
        <div className="relative bg-gradient-to-r from-[#1e1145] via-[#2D1B69] to-[#4c2a96] px-8 py-10 flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>

          <div className="relative group">
            <img
              src={logo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="Company Logo"
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white/10 shadow-xl bg-white/90 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="text-center sm:text-left z-10 grid gap-1">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {company?.companyName || "Company Profile"}
            </h1>
            <p className="text-violet-200/90 text-sm font-medium">
              {company?.industry || "Manage your organization details"}
            </p>
            {company?.recruiterName && (
              <p className="text-xs text-violet-300/80">
                Managed by: <span className="text-white font-semibold">{company.recruiterName}</span>
              </p>
            )}
            {company?.location && (
              <div className="flex items-center gap-1.5 mt-2 justify-center sm:justify-start bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-violet-300" />
                <span className="text-white text-xs font-medium">{company.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* 📝 ফর্ম */}
        <form onSubmit={handleUpdateProfile} className="p-8 sm:p-10 space-y-8">

          {/* সেকশন ১: বেসিক ইনফরমেশন */}
          <div>
            <h2 className="text-xs font-black text-violet-700 uppercase tracking-widest mb-6 flex items-center gap-2 pb-2 border-b border-gray-100">
              <Building2 className="w-4 h-4" /> Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className={labelClass}>Company Name</label>
                <div className={inputContainerClass}>
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <input name="companyName" defaultValue={company?.companyName} placeholder="e.g. TechCorp BD" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Company Email</label>
                <div className={inputContainerClass}>
                  <Mail className="w-4 h-4 text-gray-400" />
                  <input type="email" name="email" defaultValue={company?.email} placeholder="company@email.com" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <div className={inputContainerClass}>
                  <Phone className="w-4 h-4 text-gray-400" />
                  <input name="phone" defaultValue={company?.phone} placeholder="+880 1800-000000" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Website</label>
                <div className={inputContainerClass}>
                  <Globe className="w-4 h-4 text-gray-400" />
                  <input name="website" defaultValue={company?.website} placeholder="https://yoursite.com" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Industry</label>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-1.5 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-200 focus-within:bg-white transition-all duration-300">
                  <select name="industry" defaultValue={company?.industry} className="select select-ghost w-full bg-transparent border-none outline-none focus:bg-transparent text-sm text-gray-700 px-0 h-10 min-h-10 focus:outline-none">
                    <option value="">Select Industry</option>
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>E-Commerce</option>
                    <option>Marketing</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Company Size</label>
                <div className={inputContainerClass}>
                  <Users className="w-4 h-4 text-gray-400" />
                  <input name="size" defaultValue={company?.size} placeholder="e.g. 10–50 employees" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <div className={inputContainerClass}>
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <input name="location" defaultValue={company?.location} placeholder="Dhaka, Bangladesh" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Logo URL</label>
                <div className={inputContainerClass}>
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                  <input
                    name="logo"
                    defaultValue={company?.logo}
                    placeholder="https://logo-url.com/logo.png"
                    className={inputClass}
                    onChange={(e) => setLogo(e.target.value)}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* সেকশন ২: সোশ্যাল লিংকস */}
          <div>
            <h2 className="text-xs font-black text-violet-700 uppercase tracking-widest mb-6 flex items-center gap-2 pb-2 border-b border-gray-100">
              <Globe className="w-4 h-4" /> Social Profiles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>LinkedIn</label>
                <div className={inputContainerClass}>
                  {/* <Linkedin className="w-4 h-4 text-sky-600" /> */}
                  <input name="linkedin" defaultValue={company?.linkedin} placeholder="linkedin.com/company/..." className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Facebook</label>
                <div className={inputContainerClass}>
                  {/* <Facebook className="w-4 h-4 text-blue-600" /> */}
                  <input name="facebook" defaultValue={company?.facebook} placeholder="facebook.com/company" className={inputClass} />
                </div>
              </div>
            </div>
          </div>

          {/* সেকশন ৩: কোম্পানির বিবরণ */}
          <div>
            <label className="text-xs font-black text-violet-700 uppercase tracking-widest mb-3 block">
              About Company
            </label>
            <textarea
              name="about"
              defaultValue={company?.about}
              placeholder="Tell candidates about your company, culture, and mission..."
              rows={5}
              className="w-full bg-gray-50/70 border border-gray-200 rounded-2xl p-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:bg-white shadow-inner transition-all duration-300 resize-none"
            />
          </div>

          {/* সাবমিট বাটন */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto btn bg-gradient-to-r from-[#2D1B69] to-[#4c2a96] hover:from-[#1e1145] hover:to-[#3b2075] text-white border-none px-10 h-12 rounded-xl shadow-lg shadow-violet-900/20 gap-2 font-semibold transition-all duration-300 transform active:scale-98"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {loading ? "Saving Profile..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;