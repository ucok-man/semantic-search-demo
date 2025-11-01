"use server";

import { db } from "@/db";
import { productsTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { ProductSearchResult } from "./types";
import { vectordb } from "./upstash";

import { openai } from "./openai";

/**Vectorize input */
export async function vectorize(input: string): Promise<number[]> {
  const embeddingResponse = await openai.embeddings.create({
    input,
    model: "text-embedding-3-small",
  });
  const vector = embeddingResponse.data[0].embedding;
  return vector;
}

/** Perform semantic search using vector index, returning metadata as ProductSearchResult[] */
export async function searchSemanticProducts(param: {
  query: string;
  minScore: number;
  topK: number; // how many nearest neighbors to return
}): Promise<ProductSearchResult[]> {
  const { topK, minScore, query } = param;

  const vector = await vectorize(query);

  const result = await vectordb.query({
    topK,
    vector,
    includeMetadata: true,
  });

  // Keep only good-scoring results and map metadata -> ProductSearchResult
  const products = result
    .filter((item) => item.score >= minScore && item.metadata)
    .map((item) => item.metadata!) as ProductSearchResult[];

  return products;
}

function buildTsQuery(query: string): string {
  // Convert "foo bar" → "foo & bar"
  const tsQuery = query
    .trim()
    .split(/\s+/)
    .map((t) => t.replace(/[&|!():*]/g, "")) // actually remove reserved chars
    .filter((t) => t.length > 0) // remove empty strings
    .join(" & ");
  return tsQuery;
}

export async function searchLiteralProducts(
  query: string,
  limit = 3
): Promise<ProductSearchResult[]> {
  const tsQuery = buildTsQuery(query);

  const rows = await db
    .select()
    .from(productsTable)
    .where(
      sql` 
      to_tsvector('english', lower(${productsTable.name} || ' ' || ${productsTable.description})) @@ to_tsquery('english', ${tsQuery})`
    )
    .limit(limit);

  return rows;
}

/**List all product */
export async function listProduct(): Promise<ProductSearchResult[]> {
  const rows = await db.select().from(productsTable);
  return rows;
}
