"use client";

import { useMemo } from "react";
import { motion, Variants } from "framer-motion";

const emojis = ["💡", "🚀", "✨", "🔑", "📚", "🎯", "🔬", "📈", "🧩", "🎨"];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ContentSection({ group }: { group: string[] }) {
  const pointEmojis = useMemo(() => {
    return group.map((_, index) => emojis[index % emojis.length]);
  }, [group]);

  return (
    <motion.div
      className="flex flex-col gap-4 items-center justify-start h-full w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {group.map((point, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className="flex items-center justify-start text-left w-full gap-4 bg-violet-50 border border-violet-100 text-black text-sm px-4 py-3 rounded-xl shadow"
        >
          <span className="text-xl">{pointEmojis[i]}</span>
          <span className="flex-1 break-words">{point}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
