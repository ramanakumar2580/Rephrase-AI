// utils/summary-helper.ts

export function groupSummaryPoints(content: string, groupSize = 3): string[][] {
  // Avoid breaking on abbreviations like "M. Ramana"
  const sentences = content
    .split(/(?<=[^A-Z].[.?!])\s+(?=[A-Z])/g) // Improved sentence split
    .map((s) => s.trim())
    .filter(Boolean);

  const groups: string[][] = [];
  for (let i = 0; i < sentences.length; i += groupSize) {
    groups.push(sentences.slice(i, i + groupSize));
  }
  return groups;
}
