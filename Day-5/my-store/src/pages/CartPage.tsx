import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

export default function CartPage() {
  const { cart, clearCart } = useCart();

  const total = cart.items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  if (cart.items.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cart.items.map((it) => (
          <CartItem key={it.product.id} item={it} />
        ))}
      </div>

      <div className="mt-6 p-4 bg-white rounded shadow">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Total</div>
          <div className="text-xl font-bold">${total.toFixed(2)}</div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 rounded bg-green-600 text-white">Checkout (demo)</button>
          <button onClick={() => clearCart()} className="px-4 py-2 rounded bg-gray-200">Clear Cart</button>
        </div>
      </div>
    </div>
  );
}