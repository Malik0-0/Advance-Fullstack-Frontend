import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";


export default function Cart() {
  const { state, dispatch } = useCart();

  const total = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  if (state.items.length === 0) return <div>Your cart is empty</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="space-y-4">
        {state.items.map((it) => (
          <div key={it.product.id} className="flex items-center gap-4 p-4 bg-white rounded shadow">
            <img src={it.product.image} className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <div className="font-medium">{it.product.title}</div>
              <div className="text-sm text-gray-600">${it.product.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => dispatch({ type: "UPDATE_QUANTITY", productId: it.product.id, quantity: Math.max(1, it.quantity - 1) })} className="px-2">-</Button>
              <div>{it.quantity}</div>
              <Button onClick={() => dispatch({ type: "UPDATE_QUANTITY", productId: it.product.id, quantity: it.quantity + 1 })} className="px-2">+</Button>
            </div>
            <div className="w-32 text-right font-medium">${(it.product.price * it.quantity).toFixed(2)}</div>
            <Button onClick={() => dispatch({ type: "REMOVE_ITEM", productId: it.product.id })} className="ml-4 text-sm text-red-600">Remove</Button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-xl font-semibold">Total: ${total.toFixed(2)}</div>
        <Button className="px-4 py-2 rounded bg-green-600 text-white">Checkout</Button>
      </div>
    </div>
  );
}