"use client";

import { useState, useRef } from "react";

import { NavigationController } from "@/components/summaries/navigation-controller";
import { ProgressBar } from "@/components/summaries/progress-bar";
import { ContentSection } from "@/components/summaries/content-section";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { groupSummaryPoints } from "@/utils/summary-helper";

type SummarySection = {
  title: string;
  content: string;
};

export function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  let sections: SummarySection[] = [];

  try {
    sections = JSON.parse(summary);
  } catch (err) {
    console.error("Invalid summary JSON:", err);
  }

  if (!sections.length) {
    return (
      <p className="text-sm text-muted-foreground">No summary available.</p>
    );
  }

  const grouped = groupSummaryPoints(sections[0].content, 3);

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
    <Card className="w-full max-w-3xl mx-auto h-[520px] rounded-2xl shadow-lg border border-violet-100 bg-white/80 backdrop-blur-md flex flex-col overflow-hidden">
      {/* Top Progress Bar */}
      <div className="mb-1">
        <div className="flex w-full gap-1 mb-2">
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

      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-2xl font-semibold text-black">
          {sections[0].title}
        </CardTitle>
      </CardHeader>

      {/* Animated Content Section */}
      <div className="flex-1 relative">
        <ContentSection key={currentSection} group={grouped[currentSection]} />
      </div>

      {/* Navigation */}
      <div className="w-full border-t border-violet-100" />
      <div className="flex items-center justify-between px-4 py-3">
        <NavigationController
          currentIndex={currentSection}
          total={grouped.length}
          onChange={handleChange}
          onLongPressStart={startAutoChange}
          onLongPressEnd={stopAutoChange}
        />
      </div>
    </Card>
  );
}
