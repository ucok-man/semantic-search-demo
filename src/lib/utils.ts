import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProductSearchResult } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isQueryValid(query: unknown): query is string {
  return (
    typeof query === "string" &&
    query.trim().length > 0 &&
    !Array.isArray(query)
  );
}

/** Merge arrays and remove duplicates by product.id (keep original order) */
export function mergeUniqueProducts(
  primary: ProductSearchResult[],
  additions: ProductSearchResult[]
) {
  const seen = new Set<string | number>();
  const merged: ProductSearchResult[] = [];

  for (const p of primary) {
    merged.push(p);
    seen.add(p.id);
  }

  for (const p of additions) {
    if (!seen.has(p.id)) {
      merged.push(p);
      seen.add(p.id);
    }
  }

  return merged;
}
