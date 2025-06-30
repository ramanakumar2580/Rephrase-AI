"use client";

import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function UploadHeader() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-violet-400 via-violet-600 to-violet-800"
      >
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-indigo-100 transition-colors"
        >
          <Sparkles
            className="mr-3 text-violet-600 animate-pulse"
            style={{ height: "20px", width: "20px" }}
          />
          <span className="text-base text-violet-600">
            AI-Powered Summaries
          </span>
        </Badge>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        Start Uploading{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDFs</span>
          <span
            className="absolute inset-0 bg-violet-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-center mt-2 text-lg leading-8 text-gray-600 max-w-2xl"
      >
        Upload your document and let our AI do the magic! ✨
      </motion.p>
    </motion.div>
  );
}
