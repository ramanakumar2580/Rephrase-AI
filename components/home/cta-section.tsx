import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { MotionDiv } from "../common/motion-wrapper"; // assuming your MotionDiv uses `framer-motion`

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12">
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }} // 👈 Re-animates on every scroll into view
        className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }} // 👈 animate each scroll
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Save Hours of Reading Time?
            </h2>
            <p className="mx-auto max-w-2xl md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-gray-500 dark:text-gray-400">
              Transform lengthy documents into clear, actionable insights with
              our AI-powered summarizer.
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col gap-2 min-[400px]:flex-row justify-center"
          >
            <Button
              size="lg"
              variant="link"
              className="w-full min-[400px]:w-auto bg-gradient-to-r from-slate-900 to-violet-500
              hover:from-violet-500 hover:to-slate-900 hover:text-white text-white transition-all duration-300"
            >
              <Link
                href="#pricing"
                className="flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </MotionDiv>
        </div>
      </MotionDiv>
    </section>
  );
}
