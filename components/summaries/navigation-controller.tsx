"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentIndex: number;
  total: number;
  onChange: (index: number) => void;
  onLongPressStart: (dir: "next" | "prev") => void;
  onLongPressEnd: () => void;
};

export function NavigationController({
  currentIndex,
  total,
  onChange,
  onLongPressStart,
  onLongPressEnd,
}: Props) {
  return (
    <div className="flex items-center justify-between w-full px-2 sm:px-4">
      {/* Left Arrow */}
      <button
        onClick={() => onChange(currentIndex - 1)}
        onMouseDown={() => onLongPressStart("prev")}
        onMouseUp={onLongPressEnd}
        onTouchStart={() => onLongPressStart("prev")}
        onTouchEnd={onLongPressEnd}
        className="w-9 h-9 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 flex items-center justify-center"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Dot Navigation */}
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentIndex ? "bg-violet-600" : "bg-violet-300"
            }`}
          />
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => onChange(currentIndex + 1)}
        onMouseDown={() => onLongPressStart("next")}
        onMouseUp={onLongPressEnd}
        onTouchStart={() => onLongPressStart("next")}
        onTouchEnd={onLongPressEnd}
        className="w-9 h-9 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 flex items-center justify-center"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
