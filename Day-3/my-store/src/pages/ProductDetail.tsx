import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";
import { useCart } from "../contexts/CartContext";
import type { Product } from "../types";
import { Button } from "@/components/ui/button";


export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  useEffect(() => {
    if (!id) return;
    fetchProductById(Number(id))
      .then((p) => setProduct(p))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={product.image} alt={product.title} className="w-full h-96 object-contain bg-white p-4" />
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</p>
        <p className="mt-4 text-sm text-gray-700">{product.description}</p>
        <div className="mt-6">
          <Button
            onClick={() => dispatch({ type: "ADD_ITEM", product })}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}