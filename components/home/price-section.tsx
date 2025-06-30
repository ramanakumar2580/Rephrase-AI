"use client";

import { cn } from "@/lib/utils";
import { Pricingplans } from "@/utils/constants";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { Variants } from "framer-motion";
import { MotionDiv } from "@/components/common/motion-wrapper";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const featureListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const featureItemVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  const isPro = id === "pro";

  return (
    <MotionDiv variants={cardVariants} className="w-full max-w-lg">
      <MotionDiv
        whileHover={{
          scale: 1.04,
          boxShadow: "0px 10px 30px -5px rgba(139, 92, 246, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className={cn(
          "relative flex h-full cursor-pointer flex-col gap-4 rounded-2xl border-[1px] border-gray-200 bg-white p-8 lg:gap-8",
          isPro && "border-2 border-violet-400"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold capitalize lg:text-xl">{name}</p>
            <p className="mt-2 text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-5xl font-extrabold tracking-tight">${price}</p>
          <div className="mb-[4px] flex flex-col justify-end">
            <p className="text-xs font-semibold uppercase text-gray-500">USD</p>
            <p className="text-xs text-gray-500">/month</p>
          </div>
        </div>
        <MotionDiv
          variants={featureListVariants}
          className="flex-1 space-y-2.5 text-base leading-relaxed"
        >
          {items.map((item, idx) => (
            <MotionDiv
              key={idx}
              variants={featureItemVariants}
              className="flex items-center gap-2"
            >
              <CheckIcon size={18} className="text-violet-500" />
              <span>{item}</span>
            </MotionDiv>
          ))}
        </MotionDiv>
        <div>
          <Link
            href={paymentLink}
            className={cn(
              "group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full py-3 text-white transition-transform duration-300 hover:scale-105",
              isPro
                ? "bg-violet-600 hover:bg-violet-700"
                : "bg-gray-800 hover:bg-gray-900"
            )}
          >
            Buy Now{" "}
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
};

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50" id="pricing">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-24">
        <div className="flex w-full items-center justify-center pb-12">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-xl font-black uppercase text-violet-500"
          >
            Pricing
          </MotionDiv>
        </div>

        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch"
        >
          {Pricingplans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
