import { useEffect, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

const PAGE_SIZE = 12;

export default function Products() {
  const { data: allProducts, loading, err } = useFetchProducts();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [debouncedQuery]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return allProducts;
    return allProducts.filter((p: Product) => {
      return (
        p.title.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    });
  }, [allProducts, debouncedQuery]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between gap-3">
        <input
          aria-label="Search products"
          className="w-full sm:w-1/2 border rounded px-3 py-2 shadow-sm focus:ring-2 focus:ring-primary-500"
          placeholder="Search title, category, description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">{loading ? "Loading..." : `${total} result${total !== 1 ? "s" : ""}`}</div>
        </div>
      </div>

      {err && <div className="text-red-600 mb-4">{err}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginated.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((s) => Math.max(1, s - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">Page {page} / {totalPages}</span>
        <button
          onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}