import ProductRow from "@/components/product-row";
import { listProduct } from "@/lib/actions";

export default async function HomePage() {
  const products = await listProduct();

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-center gap-1 italic">
        <h1 className="text-sm font-semibold text-gray-500">
          Try searching for something.
        </h1>
        <p className="text-sm text-gray-500">
          Hit <span className="font-semibold text-gray-700">Enter</span> when
          you're done 😃
        </p>
      </div>

      <div>
        <ul className="divide-y divide-zinc-100 rounded-b-md bg-white py-4 shadow-md">
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
