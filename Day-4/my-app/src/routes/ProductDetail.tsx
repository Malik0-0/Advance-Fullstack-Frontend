import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/product";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch product");
        return r.json();
      })
      .then((d: Product) => setProduct(d))
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (err) return <div className="text-red-600">{err}</div>;
  if (!product) return <div>No product</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 flex items-center justify-center bg-card p-6 rounded dark:bg-[#071226]">
        <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
      </div>
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-muted-foreground mb-4">{product.category}</p>
        <p className="mb-4">{product.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
          <button className="px-4 py-2 rounded bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500">Buy now</button>
        </div>
      </div>
    </div>
  );
}