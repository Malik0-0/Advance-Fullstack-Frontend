import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-2">Welcome to MyStore</h1>
      <p className="text-muted-foreground mb-4">Browse curated products — demo powered by Fake Store API.</p>
      <Link to="/products" className="px-4 py-2 rounded border hover:bg-gray-100 dark:hover:bg-[#0e2134]">Browse Products</Link>
    </div>
  );
}