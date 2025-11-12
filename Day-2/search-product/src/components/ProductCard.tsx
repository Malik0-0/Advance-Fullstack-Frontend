import type  { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 flex items-center justify-center overflow-hidden bg-gray-100">
        <img src={product.image} alt={product.title} className="max-h-full object-contain p-4" />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
        <p className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</p>
        <p className="mt-3 text-xs text-gray-500 line-clamp-3">{product.description}</p>
      </div>
    </article>
  );
}