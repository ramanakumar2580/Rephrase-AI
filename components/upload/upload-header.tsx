import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div
        className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r 
    from-violet-400 via-violet-600 to-violet-800 animate-gradient-x group"
      >
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full
  group-hover:bg-indigo-100 transition-colors "
        >
          <Sparkles
            className="mr-3 text-violet-600 animate-pulse"
            style={{ height: "20px", width: "20px" }}
          />
          <span className="text-base text-violet-600">
            AI- Powered Content Creation
          </span>
        </Badge>
      </div>
      <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Start uploading {""}
        <span className="relative inline-block">
          <span className="relative z-10 px-2 ">Your PDF's</span>
          <span
            className="absolute inset-0 bg-violet-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
        {""}
      </div>
      <div className="text-center mt-2 text-lg leading-8 text-gray-600 max-w-2xl ">
        <p>Upload your PDF and let our AI do the magic! ✨ </p>
      </div>
    </div>
  );
}
