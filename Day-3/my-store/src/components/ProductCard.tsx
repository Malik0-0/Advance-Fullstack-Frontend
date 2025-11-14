import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col">
      <Link to={`/products/${product.id}`} className="flex-1">
        <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto" />
        <h3 className="mt-3 font-medium text-sm line-clamp-2">{product.title}</h3>
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
        <Button
          onClick={() => dispatch({ type: "ADD_ITEM", product })}
          className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          Add
        </Button>
      </div>
    </div>
  );
}