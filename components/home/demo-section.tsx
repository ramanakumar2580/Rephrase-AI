"use client";

import React, { useState } from "react";
import {
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Layers,
  Pizza,
  Server,
  Sparkles,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";

// Summary points for the carousel
const summaryPoints = [
  {
    icon: <BrainCircuit className="h-6 w-6 shrink-0 text-violet-500" />,
    text: "Comprehensive Next.js 15 course covering everything from fundamentals to advanced deployment strategies.",
  },
  {
    icon: <Layers className="h-6 w-6 shrink-0 text-violet-500" />,
    text: "Learn the new App Router for creating robust, server-rendered React applications and layouts.",
  },
  {
    icon: <Server className="h-6 w-6 shrink-0 text-violet-500" />,
    text: "Master Server Actions for simplifying data mutations and API interactions directly on the server.",
  },
  {
    icon: <Wind className="h-6 w-6 shrink-0 text-violet-500" />,
    text: "Explore advanced features like middleware, route handlers, and streaming UI for optimal performance.",
  },
  {
    icon: <Sparkles className="h-6 w-6 shrink-0 text-violet-500" />,
    text: "The final summary is concise, easy to skim, and captures all the critical information from the source.",
  },
];

const slideVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function DemoSection() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev === summaryPoints.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? summaryPoints.length - 1 : prev - 1));
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
        {/* Background Gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 
            bg-gradient-to-br from-violet-400 via-violet-400 to-violet-500 opacity-30 sm:left-[calc(50%+36rem)] 
            sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Animated Pizza Icon & Title */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              type: "spring",
              bounce: 0.3,
            }}
            className="mb-4 inline-flex items-center justify-center rounded-2xl border border-gray-500/20 bg-gray-100/80 p-2 backdrop-blur-xs"
          >
            <Pizza className="h-6 w-6 text-violet-500" />
          </motion.div>

          <MotionH3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-3xl px-4 font-bold text-3xl sm:px-6"
          >
            Watch how DocSift AI transforms{" "}
            <span className="bg-gradient-to-r from-violet-500 to-violet-500 bg-clip-text text-transparent">
              this Next.js course PDF
            </span>{" "}
            into an easy-to-read summary!
          </MotionH3>
        </div>

        {/* Carousel Section */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-20 w-full max-w-2xl"
        >
          <div className="rounded-2xl border border-gray-200/80 bg-white/60 p-6 shadow-xl backdrop-blur-lg sm:p-8">
            {/* Progress Bar */}
            <div className="mb-6 flex w-full gap-1.5 px-2 sm:px-4">
              {summaryPoints.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    index === current ? "bg-violet-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="px-2 sm:px-4">
              <h3 className="mb-8 text-3xl font-bold text-gray-800">
                Quick Overview
              </h3>
            </div>

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
                  <div className="flex w-full items-start gap-4 rounded-xl bg-rose-50/80 p-5 sm:p-6">
                    {summaryPoints[current].icon}
                    <p className="text-left text-base text-gray-700 sm:text-lg">
                      {summaryPoints[current].text}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between px-2 sm:px-4">
              <button
                onClick={handlePrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-500/50 bg-white text-violet-500 transition-all hover:bg-violet-50 disabled:opacity-50"
                aria-label="Previous slide"
                disabled={current === 0}
              >
                <ChevronLeft />
              </button>

              <div className="flex items-center gap-2">
                {summaryPoints.map((_, index) => (
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-transparent bg-violet-500 text-white transition-all hover:bg-violet-600 disabled:opacity-50"
                aria-label="Next slide"
                disabled={current === summaryPoints.length - 1}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
