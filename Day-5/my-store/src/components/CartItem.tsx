import type { CartItem as CI } from "../types";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }: { item: CI }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded shadow">
      <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-contain" />
      <div className="flex-1">
        <div className="font-medium">{item.product.title}</div>
        <div className="text-sm">${item.product.price.toFixed(2)}</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          disabled={item.quantity <= 1 || item.loading}
          className="px-2 py-1 border rounded"
        >
          -
        </button>
        <div className="w-10 text-center">{item.loading ? "..." : item.quantity}</div>
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          disabled={item.loading}
          className="px-2 py-1 border rounded"
        >
          +
        </button>
      </div>

      <div className="ml-4">
        <button
          onClick={() => removeFromCart(item.product.id)}
          disabled={item.loading}
          className="px-3 py-1 rounded bg-red-500 text-white"
        >
          Remove
        </button>
      </div>
    </div>
  );
}