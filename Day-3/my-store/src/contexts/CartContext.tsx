import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Product, CartItem } from "../types";

type State = { items: CartItem[] };

type Action =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "CLEAR_CART" };

const initialState: State = { items: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product, quantity }] };
    }

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

const CartContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch {}
  }, [state]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}