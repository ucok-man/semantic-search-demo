import { neon } from "@neondatabase/serverless";
import { Index } from "@upstash/vector";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { productsTable } from "../schema";
import { DUMMY_PRODUCTS } from "./products";

dotenv.config();

const index = new Index();

async function reset() {
  const connector = neon(process.env.DB_URL!);
  const db = drizzle(connector);

  console.log("Starting reset process...");

  try {
    // Delete all products from the database
    console.log("Clearing products table...");
    await db.delete(productsTable);
    console.log("Products table cleared");

    // Delete all vectors from Upstash
    console.log("Clearing vector index...");

    // Get all vector IDs and delete them
    const productIds = Array.from({ length: DUMMY_PRODUCTS.length }, (_, i) =>
      (i + 1).toString()
    );

    // Use Promise.all to delete vectors in parallel
    await Promise.all(
      productIds.map(async (id) => {
        try {
          await index.delete(id);
          console.log(`Deleted vector ${id}`);
        } catch (error) {
          console.log(`Vector ${id} not found (skipping)`);
        }
      })
    );

    console.log("Vector index cleared");
    console.log("Reset completed successfully!");
  } catch (error) {
    console.error("Error during reset:", error);
    throw error;
  }
}

reset();
