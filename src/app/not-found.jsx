import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-950 via-violet-900 to-purple-800 px-4">

      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
            <SearchX size={40} className="text-violet-200" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-white mb-3">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-white mb-3">
          Page Not Found
        </h2>

        <p className="text-violet-200 mb-8 leading-relaxed">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <Link
            href="/"
            className="
            bg-white
            text-black
            px-6
            py-3
            rounded-xl
            font-medium
            hover:bg-gray-200
            transition
            "
          >
            Go Home
          </Link>

          <Link
            href="/jobs"
            className="
            bg-violet-500
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
            hover:bg-violet-400
            transition
            "
          >
            Browse Jobs
          </Link>

        </div>

        {/* Small hint */}
        <p className="text-violet-300 text-sm mt-8">
          Try searching for jobs or go back to homepage
        </p>

      </div>

    </div>
  );
}