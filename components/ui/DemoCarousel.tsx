"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  icon: React.ReactNode;
  text: string;
}

interface DemoCarouselProps {
  slides: Slide[];
}

const slideVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function DemoCarousel({ slides }: DemoCarouselProps) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white/60 p-6 shadow-xl backdrop-blur-lg sm:p-8">
      {/* Segmented Progress Bar */}
      <div className="mb-6 flex w-full gap-1.5">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors ${
              index === current ? "bg-violet-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <h3 className="mb-8 text-3xl font-bold text-gray-800">Quick Overview</h3>

      {/* Carousel Content */}
      <div className="relative mb-6 min-h-[160px] overflow-hidden sm:min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute flex w-full items-center justify-center"
          >
            <div className="flex w-full items-start gap-4 rounded-xl bg-violet-50/80 p-5 sm:p-6">
              {slides[current].icon}
              <p className="text-left text-base text-gray-700 sm:text-lg">
                {slides[current].text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-500/50 bg-white text-violet-500 transition-all hover:bg-violet-50 disabled:opacity-50"
          aria-label="Previous slide"
          disabled={current === 0}
        >
          <ChevronLeft />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === current ? "w-5 bg-violet-500" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-violet-600 text-white transition-all hover:bg-violet-700 disabled:opacity-50"
          aria-label="Next slide"
          disabled={current === slides.length - 1}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
