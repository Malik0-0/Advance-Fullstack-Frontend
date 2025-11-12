import ProductList from "./pages/ProductList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold">Search Product — Demo</h1>
        <p className="mt-1 text-sm text-gray-600">Built with Vite + React + TypeScript + Tailwind</p>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-12">
        <ProductList />
      </main>
    </div>
  );
}
