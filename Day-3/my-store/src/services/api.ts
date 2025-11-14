import type { Product } from "../types";

const API_ROOT = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_ROOT}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_ROOT}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}