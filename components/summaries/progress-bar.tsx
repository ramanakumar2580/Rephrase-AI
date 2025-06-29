const gradients = [
  "from-pink-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-violet-600 to-orange-600",
  "from-rose-400 to-red-600",
  "from-amber-500 to-yellow-500",
];

export function ProgressBar({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  const color = gradients[current % gradients.length];

  return (
    <div className="w-full px-4 pt-4 mb-2">
      <div className="flex w-full gap-1 mb-2">
        {Array.from({ length: total }).map((_, idx) => (
          <div
            key={idx}
            className={`flex-1 h-[6px] rounded-full transition-all duration-300 ${
              current === idx ? `bg-gradient-to-r ${color}` : "bg-violet-200"
            }`}
          />
        ))}
      </div>
      <div className="w-full border-b border-violet-100" />
    </div>
  );
}
