import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Store</h1>
      <p className="text-lg mb-6">A small demo store using Vite, React + TS, Tailwind, and ShadCN UI</p>
      <Link to="/products" className="px-4 py-2 rounded bg-indigo-600 text-white">Browse Products</Link>
    </div>
  );
}