import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { MapPin, Building2, DollarSign, CalendarDays } from "lucide-react";

const Dynamic = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/jobs/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">

          <div className="relative h-[320px] w-full">
            <Image
              src={data?.image || "https://images.unsplash.com/photo-1521791136064-7986c2920216"}
              alt={data?.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute bottom-6 left-6">
              <h1 className="text-4xl font-bold">{data?.title}</h1>
              <p className="mt-2 text-slate-300">
                {data?.company}
              </p>
            </div>
          </div>

          <div className="p-8">

            <div className="grid md:grid-cols-3 gap-4 mb-8">

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <Building2 className="mb-2" />
                <p className="text-sm text-slate-400">Company</p>
                <p>{data?.company}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <MapPin className="mb-2" />
                <p className="text-sm text-slate-400">Location</p>
                <p>{data?.location}</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <DollarSign className="mb-2" />
                <p className="text-sm text-slate-400">Salary</p>
                <p>{data?.salary}</p>
              </div>

            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Job Description
              </h2>

              <p className="text-slate-300 leading-8">
                {data?.description}
              </p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CalendarDays size={18} />
                <span>Deadline: {data?.deadline}</span>
              </div>

              <div className="flex gap-3">
                <Link href="/jobs">
                  <Button variant="bordered">
                    Back
                  </Button>
                </Link>

                <Button color="primary">
                  Apply Now
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dynamic;