import type { Product } from "../types";
import { Link } from "react-router-dom";

type Props = {
  product: Product;
  onAdd?: (p: Product) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1">
        <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
        <h3 className="font-semibold text-sm">{product.title}</h3>
        <p className="mt-2 text-lg font-bold">${product.price.toFixed(2)}</p>
      </Link>
      <div className="mt-4">
        <button
          onClick={() => onAdd?.(product)}
          className="w-full px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}