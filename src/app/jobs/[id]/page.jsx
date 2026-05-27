import Image from "next/image";
import Link from "next/link";


const DynamicJOb = async({params}) => {
  const {id}= await params
  const res = await fetch(`http://localhost:5000/add/${id}`);
  const data = await res.json();
  console.log(data)
  return (
    <div>
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

  <div className="max-w-xl w-full bg-slate-900/50 border border-slate-800 rounded-3xl p-8">

    <Image
      src={data?.image}
      height={180}
      width={180}
      alt="company"
      className="rounded-3xl mx-auto mb-4 border border-slate-700"
    
    />

    <h1 className="text-3xl font-bold text-gray-500">
      {data?.title}
    </h1>

    <p className="text-indigo-400 text-sm mb-3">
      {data?.company}
    </p>

    <p className="text-green-500 mb-6">
      {data?.description}
    </p>

    <div className="flex justify-between text-sm text-slate-400 border-t border-slate-800 pt-4">
      <span>📍 {data?.location}</span>
      <span>💰 {data?.salary}</span>
    </div>

    <Link href="/jobs">
      <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl">
        Go Back
      </button>
    </Link>

  </div>
</div>
      
    </div>
  );
};

export default DynamicJOb;