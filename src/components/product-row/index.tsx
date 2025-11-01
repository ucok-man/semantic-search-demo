import { ProductSearchResult } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductRow({
  product,
}: {
  product: ProductSearchResult;
}) {
  return (
    <li className="mx-auto flex space-x-4 px-8 py-4">
      <Link href={`#`} className="flex w-full items-center">
        <div className="relative flex size-40 items-center rounded-lg bg-zinc-100">
          <Image
            loading="eager"
            fill
            alt="product-image"
            src={`/${product.imageId}`}
          />
        </div>

        <div className="w-full flex-1 space-y-2 py-1 pl-4">
          <h1 className="text-lg font-medium text-gray-900">{product.name}</h1>

          <p className="prose prose-sm line-clamp-3 text-gray-500">
            {product.description}
          </p>

          <p className="text-base font-medium text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </li>
  );
}
