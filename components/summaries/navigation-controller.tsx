"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { ProgressBar } from "./progress-bar";

export function NavigationController({
  currentIndex,
  total,
  onChange,
  onLongPressStart,
  onLongPressEnd,
}: {
  currentIndex: number;
  total: number;
  onChange: (i: number) => void;
  onLongPressStart: (dir: "next" | "prev") => void;
  onLongPressEnd: () => void;
}) {
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDown = (dir: "next" | "prev") => {
    holdTimeout.current = setTimeout(() => onLongPressStart(dir), 300);
  };
  const handleUp = () => {
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
    onLongPressEnd();
  };

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <button
        onClick={() => onChange(currentIndex - 1)}
        onMouseDown={() => handleDown("prev")}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        disabled={currentIndex === 0}
        className="p-2 rounded-full bg-violet-100 hover:bg-violet-200 disabled:opacity-30"
      >
        <ChevronLeft className="w-4 h-4 text-violet-600" />
      </button>

      <ProgressBar total={total} current={currentIndex} />

      <button
        onClick={() => onChange(currentIndex + 1)}
        onMouseDown={() => handleDown("next")}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        disabled={currentIndex === total - 1}
        className="p-2 rounded-full bg-violet-100 hover:bg-violet-200 disabled:opacity-30"
      >
        <ChevronRight className="w-4 h-4 text-violet-600" />
      </button>
    </div>
  );
}
