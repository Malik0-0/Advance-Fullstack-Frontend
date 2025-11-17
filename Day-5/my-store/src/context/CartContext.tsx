import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product, CartItem } from "../types";
import { simulateApi } from "../api/mockApi";

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  cart: CartState;
  addToCart: (product: Product, qty?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartState>({ items: [] });

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setCart(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Add to cart (optimistic)
  const addToCart = async (product: Product, qty = 1) => {
    console.log("[CART] addToCart optimistic:", { productId: product.id, qty });
    // optimistic update
    setCart((prev) => {
      const idx = prev.items.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const items = [...prev.items];
        items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
        return { items };
      }
      return { items: [...prev.items, { product, quantity: qty }] };
    });

    try {
      console.log("[CART] addToCart confirmed by API");
      // simulate API call
      await simulateApi(true);
    } catch (e) {
      console.log("[CART] addToCart FAILED, reverting");
      // revert: remove added qty
      setCart((prev) => {
        const idx = prev.items.findIndex((i) => i.product.id === product.id);
        if (idx === -1) return prev;
        const items = [...prev.items];
        const newQty = items[idx].quantity - qty;
        if (newQty <= 0) items.splice(idx, 1);
        else items[idx] = { ...items[idx], quantity: newQty };
        alert("Add to cart failed. Reverting.");
        return { items };
      });
    }
  };

  // Update quantity (optimistic, per-item loading)
  const updateQuantity = async (productId: number, quantity: number) => {
    console.log("[CART] updateQuantity optimistic:", { productId, quantity });
    // store previous state to revert if failure
    const prevState = cart.items;
    setCart((prev) => {
      const items = prev.items.map((it) =>
        it.product.id === productId ? { ...it, quantity, loading: true } : it
      );
      return { items };
    });

    try {
      console.log("[CART] updateQuantity confirmed by API");
      await simulateApi(true);
      // clear loading flag
      setCart((prev) => {
        return {
          items: prev.items.map((it) =>
            it.product.id === productId ? { ...it, loading: false } : it
          ),
        };
      });
    } catch {
      console.log("[CART] updateQuantity FAILED, reverting");
      // revert
      setCart({ items: prevState.map((it) => ({ ...it, loading: false })) });
      alert("Update quantity failed. Reverting.");
    }
  };

  // Remove from cart (optimistic)
  const removeFromCart = async (productId: number) => {
    console.log("[CART] removeFromCart optimistic:", productId);
    const prevState = cart.items;
    setCart((prev) => ({ items: prev.items.filter((it) => it.product.id !== productId) }));

    try {
      console.log("[CART] removeFromCart confirmed");
      await simulateApi(true);
    } catch {
      console.log("[CART] removeFromCart FAILED, reverting"); 
      setCart({ items: prevState });
      alert("Remove failed. Reverting.");
    }
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}