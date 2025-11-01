import ProductRow from "@/components/product-row";
import { searchLiteralProducts, searchSemanticProducts } from "@/lib/actions";
import { isQueryValid, mergeUniqueProducts } from "@/lib/utils";
import { X } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

/** Small presentational pieces to keep render clean */
function NoResults({ query }: { query: string }) {
  return (
    <div className="rounded-b-md bg-white py-4 text-center shadow-md">
      <X className="mx-auto size-8 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No results</h3>
      <p className="mx-auto mt-1 max-w-prose text-sm text-gray-500">
        Sorry, we couldn&apos;t find any matches for{" "}
        <span className="font-medium text-green-600">{query}</span>.
      </p>
    </div>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  // if query is missing or is an array redirect to home
  if (!isQueryValid(searchParams.query)) {
    return redirect("/");
  }

  const query = searchParams.query.trim();

  // 1) Try literal/full-text search first (limit 3)
  let products = await searchLiteralProducts(query, 3);

  // 2) If not enough literal results, try semantic search and merge (dedup)
  if (products.length < 3) {
    const semanticProducts = await searchSemanticProducts({
      minScore: 0.5,
      query: query,
      topK: 5, // result to return
    });

    // Remove duplicates (keeps literal results first)
    products = mergeUniqueProducts(products, semanticProducts);
  }

  // 3) If still no results show NoResults component
  if (products.length === 0) {
    return <NoResults query={query} />;
  }

  // 4) Render up to 3 items
  return (
    <ul className="divide-y divide-zinc-100 rounded-b-md bg-white py-4 shadow-md">
      {products.slice(0, 3).map((product) => (
        <ProductRow key={product.id} product={product} />
      ))}
    </ul>
  );
}
