import { Product } from "@/db/schema";

export type ProductSearchResult = Omit<Product, "createdAt" | "updatedAt">;
