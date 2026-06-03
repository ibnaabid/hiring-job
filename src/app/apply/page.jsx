import Image from "next/image";
import { authClient } from "../lib/auth-client";

const Apply = async () => {
  const { data: session } = await authClient.getSession();

  const res = await fetch(
    `http://localhost:5000/apply/${session?.user?.email}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <Image
              src={session?.user?.image || "/user.png"}
              alt="user"
              width={80}
              height={80}
              className="rounded-full border-4 border-indigo-500"
            />

            <div>
              <h1 className="text-2xl font-bold">
                {session?.user?.name}
              </h1>

              <p className="text-gray-500">
                {session?.user?.email}
              </p>

              <p className="mt-2 text-sm text-indigo-600 font-semibold">
                Total Applications: {data?.length}
              </p>
            </div>
          </div>
        </div>

        {/* Applied Jobs */}
        <h2 className="text-3xl font-bold mb-6">
          Applied Jobs
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* <img
                src={job.image}
                alt={job.title}
                className="w-full h-48 object-cover"
              /> */}

              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">
                  {job.title}
                </h3>

                <p className="text-gray-600 mb-2">
                  {job.company}
                </p>

                <p className="text-sm text-gray-500">
                  📍 {job.location}
                </p>

                <p className="text-green-600 font-semibold mt-2">
                  💰 {job.salary}
                </p>

                <div className="mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : job.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center mt-8">
            <h2 className="text-2xl font-bold text-gray-700">
              No Applications Found
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't applied for any jobs yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apply;