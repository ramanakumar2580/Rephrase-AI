import { ArrowRight, Sparkles } from "lucide-react";
import BgGradient from "./bg-gradient";
import { Button } from "../ui/button";
import Link from "next/link";

export default function UpgradeRequired() {
  return (
    <div className="relative min-h-[50vh]">
      <BgGradient className="from-violet-400 via-violet-300 to-orange-200" />
      <div className="container px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-violet-500">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Premium Feature
            </span>
          </div>
          <h1
            className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-600
          bg-clip-text text-transparent"
          >
            Subscription Required
          </h1>
          <p
            className="text-lg leading-8 text-gray-600 border-2 border-violet-300 bg-white/50
          backdrop-blur-xs rounded-lg p-6 border-dashed max-w-xl"
          >
            This feature is part of our premium offerings. Upgrade to the Basic
            or Pro plan to enjoy full access🌟
          </p>
          <Button
            asChild
            className="bg-linear-to-r from-violet-500 to-violet-700 
            hover: from-violet-600 hover: to-violet-800 text-white"
          >
            <Link href="/#pricing" className="flex gap-2 items-center">
              View Pricing Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
