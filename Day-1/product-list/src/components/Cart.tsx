// import React from "react";
import type { Product } from "../types/product";

type Props = {
  open: boolean;
  onClose: () => void;
  cartItems: Record<string, number>;
  products: Product[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function Cart({
  open,
  onClose,
  cartItems,
  products,
  onIncrement,
  onDecrement,
  onRemove,
}: Props) {
  if (!open) return null;

  const items = Object.keys(cartItems)
    .map((id) => {
      const product = products.find((p) => p.id === id);
      const qty = cartItems[id];
      return product ? { product, qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];

  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      {/* drawer */}
      <aside className="relative ml-auto w-full max-w-md bg-white h-full shadow-xl p-4 overflow-auto">
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <div>
            <button onClick={onClose} className="px-3 py-1 rounded border">
              Close
            </button>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="text-center text-gray-600 py-12">Your cart is empty.</div>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-600">
                      Rp {product.price.toLocaleString("id-ID")} × {qty}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDecrement(product.id)}
                      className="px-2 py-1 border rounded"
                    >
                      −
                    </button>
                    <div className="min-w-[28px] text-center">{qty}</div>
                    <button
                      onClick={() => onIncrement(product.id)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="ml-2 px-2 py-1 rounded bg-red-50 text-red-600 border"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="mt-6 border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 btn border">Continue shopping</button>
                <button className="flex-1 btn bg-green-600 text-white">Checkout</button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
