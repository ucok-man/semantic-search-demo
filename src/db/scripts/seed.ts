import { vectorize } from "@/lib/actions";
import { faker } from "@faker-js/faker";
import { neon } from "@neondatabase/serverless";
import { Index } from "@upstash/vector";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { productsTable } from "../schema";
import { DUMMY_PRODUCTS } from "./products";

dotenv.config();

const index = new Index();

async function main() {
  const connector = neon(process.env.DB_URL!);
  const db = drizzle(connector);

  const products: (typeof productsTable.$inferInsert)[] = [];

  DUMMY_PRODUCTS.forEach(({ description, imageId }, i) => {
    products.push({
      id: (i + 1).toString(),
      name: formatFileName(imageId),
      description,
      price: parseFloat(faker.commerce.price({ min: 40, max: 200 })),
      imageId,
    });
  });

  // FIXED: Use for...of loop instead of forEach with async
  for (const product of products) {
    await db.insert(productsTable).values(product).onConflictDoNothing();

    await index.upsert({
      id: product.id!,
      vector: await vectorize(`${product.name}: ${product.description}`),
      metadata: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageId: product.imageId,
      },
    });

    console.log(`✓ Seeded product: ${product.name}`);
  }

  console.log("🎉 Seeding completed successfully!");
}

// 'dark_down_jacket_1.png' -> 'Dark Down Jacket 1'
function formatFileName(fileName: string): string {
  const nameWithoutExtension = fileName.replace(/\.\w+$/, "");
  const words = nameWithoutExtension.split("_");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}

main();
