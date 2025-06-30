import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileNameAsTitle(pathOrUrl: string): string {
  if (!pathOrUrl) return "Untitled";

  const fileName = pathOrUrl.split("/").pop() || "";
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2");

  const titleCased = withSpaces
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return titleCased.trim();
}
