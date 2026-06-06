import AllBtn from "./DeleteBtn";
import Edit from "./Edit";

const JobsTable = async() => {
    const res = await fetch("http://localhost:5000/add-job",{
        cache:"no-store"
    })
    const jobs = await res.json()
    // console.log(jobs)
  return (
    <div className="min-h-screen bg-slate-950 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Manage Jobs
          </h1>

          <p className="text-slate-400 mt-2">
            Total Jobs: {jobs.length}
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="p-5 text-slate-300">
                  Job
                </th>

                <th className="p-5 text-slate-300">
                  Company
                </th>

                <th className="p-5 text-slate-300">
                  Location
                </th>

                <th className="p-5 text-slate-300">
                  Salary
                </th>

               

                <th className="p-5 text-slate-300">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition"
                >
                  <td className="p-5">
                    <div>
                      <h2 className="font-bold text-white">
                        {job.title}
                      </h2>

                    
                    </div>
                  </td>

                  <td className="p-5 text-slate-300">
                    {job.company}
                  </td>

                  <td className="p-5 text-slate-400">
                    {job.location}
                  </td>

                  <td className="p-5 text-green-400 font-bold">
                    {job.salary}
                  </td>

              <td>
                 <AllBtn job={job}></AllBtn>
                
              </td>
              <td>
                 <Edit job={job}></Edit>
              </td>


             


                </tr>
                
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default JobsTable;