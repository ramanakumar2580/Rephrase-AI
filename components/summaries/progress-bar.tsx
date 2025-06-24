export function ProgressBar({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full transition-all ${
            i === current ? "bg-violet-600 scale-110" : "bg-violet-300"
          }`}
        />
      ))}
    </div>
  );
}
