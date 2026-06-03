"use client";

import { authClient } from "../lib/auth-client";

const User = () => {
  const { data: session } = authClient.useSession();

  return (
    <div className="p-8">
      {/* Welcome */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h2 className="text-3xl font-bold">
          Welcome, {session?.user?.name || "User"} 👋
        </h2>

        <p className="text-gray-500 mt-2">
          {session?.user?.email}
        </p>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg">Total Jobs</h3>
          <p className="text-4xl font-bold mt-2">12</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg">Applications</h3>
          <p className="text-4xl font-bold mt-2">45</p>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg">Saved Jobs</h3>
          <p className="text-4xl font-bold mt-2">8</p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg">Messages</h3>
          <p className="text-4xl font-bold mt-2">21</p>
        </div> */}
      </div>
    // </div>
  );
};

export default User;