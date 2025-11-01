import { Index } from "@upstash/vector";
import { ProductSearchResult } from "./types";

export const vectordb = new Index<ProductSearchResult>();
