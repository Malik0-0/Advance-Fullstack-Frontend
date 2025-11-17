import type { Product } from "../types";

const API_BASE = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const r = await fetch(`${API_BASE}/products`);
  if (!r.ok) throw new Error("Failed to fetch products");
  return r.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const r = await fetch(`${API_BASE}/products/${id}`);
  if (!r.ok) throw new Error("Failed to fetch product");
  return r.json();
}