import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptySummaryState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <FileText className="w-16 h-16 text-violet-400 animate-bounce-slow" />
        <h2 className="text-2xl font-bold text-gray-800">No summaries yet</h2>
        <p className="text-gray-500 max-w-md text-sm sm:text-base">
          Upload your first PDF to get started with{" "}
          <br className="hidden sm:block" /> AI-powered summaries.
        </p>
      </div>

      <Link href="/upload">
        <Button className="mt-4 bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 text-white hover:from-violet-600 hover:to-violet-800 shadow-lg px-6 py-3 rounded-full transition-all duration-300">
          Create Your First Summary
        </Button>
      </Link>
    </div>
  );
}
