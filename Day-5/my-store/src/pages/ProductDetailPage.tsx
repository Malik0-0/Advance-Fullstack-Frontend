import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/products";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(Number(id))
      .then((p) => setProduct(p))
      .catch((e) => setErr(String(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (err) return <div className="text-red-600">Error: {err}</div>;
  if (!product) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded shadow">
        <img src={product.image} alt={product.title} className="w-full h-96 object-contain" />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="mt-4 text-lg font-semibold">${product.price.toFixed(2)}</p>
        <p className="mt-4 text-sm">{product.description}</p>

        <div className="mt-6">
          <button
            onClick={() => addToCart(product, 1)}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}