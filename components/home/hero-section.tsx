import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../common/motion-wrapper";
import { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="relative mx-auto flex flex-col z-0 items-center justify-center py-16
      sm:py-20 lg:pb-8 transition-all animate-in max-w-7xl"
    >
      <MotionDiv
        variants={itemVariants}
        className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r
         from-violet-200 via-violet-500 to-violet-800 animate-gradient-x group"
      >
        <Badge
          variant="secondary"
          className="relative px-6 py-2 text-base font-medium bg-white 
            rounded-full group-hover:bg-indigo-100 transition-colors duration-200"
        >
          <Sparkles
            className="mr-3 text-violet-600 animate-pulse"
            style={{ height: "25px", width: "25px" }}
          />
          <p className="text-base text-violet-600">Powered by AI</p>
        </Badge>
      </MotionDiv>

      <MotionH1
        variants={itemVariants}
        className="text-4xl font-bold mt-6 text-center"
      >
        Convert lengthy PDFs into smart,{" "}
        <span className="relative inline-block">
          <MotionSpan
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { type: "spring", stiffness: 300, damping: 16 },
            }}
            className="relative z-10 px-2"
          >
            concise
          </MotionSpan>
          <span
            className="absolute inset-0 bg-violet-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>{" "}
        summaries
      </MotionH1>

      <MotionH2
        variants={itemVariants}
        className="text-xl mt-4 text-center text-gray-600"
      >
        Transform your document into a captivating summary reel in seconds.
      </MotionH2>

      <MotionDiv
        variants={itemVariants}
        whileHover={{
          scale: 1.04,
          y: -2,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
      >
        <Button
          variant={"link"}
          className="mt-6 bg-violet-600 text-white px-8 sm:px-10 lg:px-11 py-6 sm:py-6 lg:py-7
        hover:bg-violet-700 transition-colors duration-200 text-base sm:text-lg lg:text-l rounded-full lg:mt-12
        bg-linear-to-r from-slate-900 to-violet-600 hover:from-violet-500 hover:to-slate-900 hover:no-underline
        font-bold shadow-lg transition-all duration-300"
        >
          <Link href="/#pricing" className="flex gap-2 items-center">
            <span>Try RePhrase AI</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
}
