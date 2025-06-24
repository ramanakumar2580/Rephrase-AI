export function groupSummaryPoints(content: string, groupSize = 3): string[][] {
  const points = content
    // Split on full stops NOT preceded by a single uppercase letter (like "M.") or common abbreviations
    .split(/(?<!\b[A-Z])\.(?=\s|$)/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : s + "."));

  const groups: string[][] = [];
  for (let i = 0; i < points.length; i += groupSize) {
    groups.push(points.slice(i, i + groupSize));
  }
  return groups;
}
