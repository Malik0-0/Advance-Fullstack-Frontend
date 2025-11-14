import { Link } from "react-router-dom";
import type { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="bg-card p-4 rounded-lg shadow-sm card-hover dark:bg-[#071226]">
      <Link to={`/products/${product.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
        <div className="h-48 flex items-center justify-center mb-3">
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
        </div>
        <h3 className="font-medium text-sm mb-1 hover:text-primary-500">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">{product.rating?.rate ?? "—"} ⭐</span>
        </div>
      </Link>
    </article>
  );
}