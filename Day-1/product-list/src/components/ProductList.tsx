import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import type { Product } from "../types/product";
import { products as initialProducts } from "../data/products";

const LOCALSTORAGE_KEY = "cart";

export default function ProductList() {
  // cartItems: id -> quantity
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_KEY);
      if (raw) setCartItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // persist whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  function toggleProduct(id: string) {
    setCartItems((prev) => {
      const exists = prev[id];
      if (exists) {
        // remove item entirely
        const copy = { ...prev };
        delete copy[id];
        return copy;
      } else {
        return { ...prev, [id]: 1 };
      }
    });
  }

  function increment(id: string) {
    setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function decrement(id: string) {
    setCartItems((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      } else {
        return { ...prev, [id]: current - 1 };
      }
    });
  }

  function remove(id: string) {
    setCartItems((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }

  const totalDistinct = Object.keys(cartItems).length;
  const totalQuantity = Object.values(cartItems).reduce((s, v) => s + v, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Product List</h2>

          <div className="flex items-center gap-3">
            <div className="text-sm">
              <div>Items: <span className="font-semibold">{totalQuantity}</span></div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3 py-2 rounded-md border flex items-center gap-2"
              title="Open cart"
            >
              🛒
              <span className="text-sm font-medium">{totalDistinct}</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialProducts.map((p: Product) => (
            <ProductCard
              key={p.id}
              product={p}
              added={!!cartItems[p.id]}
              count={cartItems[p.id] ?? 0}
              onToggle={toggleProduct}
              onIncrement={increment}
              onDecrement={decrement}
            />
          ))}
        </div>
      </div>

      <Cart
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        products={initialProducts}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={remove}
      />
    </div>
  );
}
