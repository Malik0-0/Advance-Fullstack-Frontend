import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { state } = useCart();
  const total = state.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">My Store</Link>
        <nav className="flex items-center gap-4">
          <Link to="/products" className="text-sm">Products</Link>
          <Link to="/cart" className="relative">
            <span className="text-sm">Cart</span>
            {total > 0 && (
              <span className="ml-2 inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{total}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}