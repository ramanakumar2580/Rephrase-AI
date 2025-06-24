"use client";
import { motion } from "framer-motion";

export function ContentSection({ group }: { group: string[] }) {
  return (
    <div className="flex flex-col px-6 py-4 gap-4 justify-center">
      {group.map((point, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.15, duration: 0.3 }}
          className="bg-violet-50 border border-violet-200 text-black text-sm sm:text-base rounded-xl px-4 py-3 shadow-sm"
        >
          {point}
        </motion.div>
      ))}
    </div>
  );
}
