"use client";
import { motion } from "framer-motion";

export function ContentSection({ group }: { group: string[] }) {
  return (
    <div className="flex flex-col gap-4 items-center justify-start h-full">
      {group.map((point, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-violet-50 border border-violet-100 text-black text-sm px-4 py-3 rounded-xl w-full max-w-full text-center shadow break-words"
        >
          {point}
        </motion.div>
      ))}
    </div>
  );
}
