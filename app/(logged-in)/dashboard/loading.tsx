"use client";

import { useEffect, useState, memo } from "react";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/common/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { itemVariants } from "@/utils/constants";
import BgGradient from "@/components/common/bg-gradient";

const HeaderSkeleton = memo(() => (
  <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:justify-between">
    <div className="flex flex-col gap-3">
      <MotionH1
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent"
      >
        <Skeleton className="h-10 w-48" aria-hidden />
      </MotionH1>
      <MotionP
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-gray-600"
      >
        <Skeleton className="h-6 w-96" aria-hidden />
      </MotionP>
    </div>
  </div>
));

const SummaryCardSkeleton = memo(() => (
  <MotionDiv
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    className="rounded-xl border border-gray-200 bg-white dark:bg-neutral-900 p-4 shadow-sm transition-all"
  >
    <Skeleton className="h-40 w-full rounded-md mb-4" role="status" />
    <Skeleton className="h-4 w-3/4 rounded mb-2" />
    <Skeleton className="h-4 w-2/3 rounded" />
  </MotionDiv>
));

export default function LoadingSummaries() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="min-h-screen relative">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />

      <section className="container px-4 sm:px-6 lg:px-8 py-16 mx-auto">
        <HeaderSkeleton />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SummaryCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
