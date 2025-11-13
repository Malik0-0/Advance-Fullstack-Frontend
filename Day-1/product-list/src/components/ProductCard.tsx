// import React from "react";
import type { Product } from "../types/product";

type Props = {
  product: Product;
  added: boolean;
  count?: number;
  onToggle: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
};

export default function ProductCard({
  product,
  added,
  count = 0,
  onToggle,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <div className="border rounded-md p-4 flex flex-col items-start gap-3 shadow-sm bg-white">
      <div className="w-full h-36 bg-gray-100 flex items-center justify-center rounded">
        <span className="text-sm text-gray-500">Image</span>
      </div>

      <div className="w-full">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">Rp {product.price.toLocaleString("id-ID")}</p>
      </div>

      <div className="mt-2 w-full flex items-center justify-between">
        {/* If not added, show add toggle */}
        {!added ? (
          <button
            onClick={() => onToggle(product.id)}
            className="btn bg-white border hover:bg-gray-50"
          >
            Add
          </button>
        ) : (
          // When added, show quantity controls (decrement / count / increment)
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrement(product.id)}
              className="px-3 py-1 rounded-md border"
              aria-label={`Decrease ${product.name}`}
            >
              −
            </button>
            <span className="min-w-[32px] text-center">{count}</span>
            <button
              onClick={() => onIncrement(product.id)}
              className="px-3 py-1 rounded-md border"
              aria-label={`Increase ${product.name}`}
            >
              +
            </button>

            <button
              onClick={() => onToggle(product.id)}
              className="ml-3 px-3 py-1 rounded-md bg-red-50 text-red-600 border"
              title="Remove from cart"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
