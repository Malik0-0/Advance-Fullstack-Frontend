import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart } = useCart();
  const count = cart.items.reduce((s, i) => s + i.quantity, 0);
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">React Cart</Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Products</Link>
          <Link to="/cart" className="hover:underline">
            Cart ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}