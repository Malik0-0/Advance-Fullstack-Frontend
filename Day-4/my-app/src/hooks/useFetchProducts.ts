import { useEffect, useState } from "react";
import type { Product } from "../types/product";

export default function useFetchProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((d: Product[]) => setData(d))
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, err };
}