import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import { ReactNode } from "react";

type STEP = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: STEP[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload PDF",
    description: "Simply drag and drop your PDF document or click to upload",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI Analysis",
    description:
      "Our advanced AI processes and analyzes your document instantly",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Get Summary",
    description: "Receive a clear, concise summary of your document",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center mb-16">
          <h2 className="font-bold text-xl uppercase mb-4 text-violet-500">
            How it works
          </h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto">
            Unlock the key insights of any PDF in just three quick and easy
            steps
          </h3>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <StepItem {...step} />
              {idx < steps.length - 1 && (
                <MoveRight
                  size={34}
                  strokeWidth={1}
                  className="hidden md:flex text-violet-400"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({ icon, label, description }: STEP) {
  return (
    <div
      className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 
      hover:border-violet-200 transition-colors group w-full"
    >
      <div className="flex flex-col gap-4 h-full items-center">
        <div
          className="flex items-center justify-center h-24 w-24 rounded-2xl 
          bg-gradient-to-br from-violet-800/10 to-transparent group-hover:from-violet-800/10 
          transition-colors"
        >
          <div className="text-violet-500">{icon}</div>
        </div>
        <h4 className="text-center font-bold text-xl">{label}</h4>
        <p className="text-center text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
