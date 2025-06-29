"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { NavigationController } from "@/components/summaries/navigation-controller";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { groupSummaryPoints } from "@/utils/summary-helper";
import { ContentSection } from "@/components/summaries/content-section";

type SummarySection = {
  title: string;
  content: string;
};

// A skeleton with a matching fixed height for a smooth loading experience
const SummarySkeleton = () => (
  <Card className="w-full max-w-3xl mx-auto h-[520px] rounded-2xl shadow-lg border border-violet-100 bg-white/80 backdrop-blur-md flex flex-col justify-center items-center">
    <p className="text-sm text-muted-foreground">Loading summary...</p>
  </Card>
);

export function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sections: SummarySection[] = useMemo(() => {
    if (!isClient) return [];
    try {
      return JSON.parse(summary || "[]");
    } catch (err) {
      console.error("Invalid summary JSON:", err);
      return [];
    }
  }, [summary, isClient]);

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: "easeIn" } },
  };

  if (!isClient) {
    return <SummarySkeleton />;
  }

  const grouped = groupSummaryPoints(sections[0]?.content || "", 3);

  if (!sections.length || !grouped.length) {
    return (
      <Card className="w-full max-w-3xl mx-auto h-[520px] rounded-2xl shadow-lg border border-violet-100 bg-white/80 backdrop-blur-md flex flex-col justify-center items-center">
        <p className="text-sm text-muted-foreground">No summary available.</p>
      </Card>
    );
  }

  // ... (handleChange, startAutoChange, stopAutoChange functions are unchanged)
  const handleChange = (index: number) => {
    if (index >= 0 && index < grouped.length) {
      setCurrentSection(index);
    }
  };
  const startAutoChange = (dir: "next" | "prev") => {
    stopAutoChange();
    intervalRef.current = setInterval(() => {
      setCurrentSection((prev) => {
        const next = dir === "next" ? prev + 1 : prev - 1;
        if (next >= 0 && next < grouped.length) return next;
        stopAutoChange();
        return prev;
      });
    }, 150);
  };
  const stopAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    // --- FIX: Returned to a FIXED height (h-[520px]) as requested. ---
    // The grid layout will properly position content within this fixed boundary.
    <Card className="w-full max-w-3xl mx-auto h-[520px] rounded-2xl shadow-lg border border-violet-100 bg-white/80 backdrop-blur-md grid grid-rows-[auto_1fr_auto] overflow-hidden">
      {/* Header Section (Top row) */}
      <div>
        <div className="mb-1">
          <div className="flex w-full gap-1 mb-2 px-4 pt-4">
            {grouped.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-[5px] rounded-full transition-all duration-300 ${
                  currentSection === idx
                    ? "bg-gradient-to-r from-violet-600 to-orange-600"
                    : "bg-violet-200"
                }`}
              />
            ))}
          </div>
          <div className="w-full border-b border-violet-100" />
        </div>
        <CardHeader className="pt-2 pb-2 text-center">
          <CardTitle className="text-2xl font-semibold text-black">
            {sections[0].title}
          </CardTitle>
        </CardHeader>
      </div>

      {/* Content Section (Middle row, fills available space and scrolls if needed) */}
      <div className="relative overflow-y-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ContentSection group={grouped[currentSection]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Section (Bottom row) */}
      <div>
        <div className="w-full border-t border-violet-100" />
        <div className="flex items-center justify-between px-4 py-2">
          <NavigationController
            currentIndex={currentSection}
            total={grouped.length}
            onChange={handleChange}
            onLongPressStart={startAutoChange}
            onLongPressEnd={stopAutoChange}
          />
        </div>
      </div>
    </Card>
  );
}
