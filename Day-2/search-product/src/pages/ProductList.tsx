import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import type  { Product } from "../types";
import debounce from "lodash.debounce";

const API_URL = "https://fakestoreapi.com/products";

export default function ProductList() {
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);
  const [results, setResults] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch all products once and cache them in state
  const fetchAllProducts = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data: Product[] = await res.json();
      setAllProducts(data);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setLoading(false);
      return null;
    }
  };

  // debounced search function to prevent repeated quick clicks
  const debouncedSearch = useMemo(
    () =>
      debounce(async (q: string) => {
        // perform search
        setLoading(true);
        setError(null);
        try {
          // if not cached, fetch
          const products = allProducts ?? (await fetchAllProducts());
          if (!products) {
            setResults([]);
            setLoading(false);
            return;
          }

          if (!q) {
            // empty query => show all
            setResults(products);
          } else {
            const low = q.toLowerCase();
            const filtered = products.filter((p) => p.title.toLowerCase().includes(low));
            setResults(filtered);
          }
        } catch (err: any) {
          setError(err.message || "Search failed");
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, 400),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allProducts]
  );

  // cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // search handler invoked from SearchBar (on submit)
  const handleSearch = (q: string) => {
    setQuery(q);
    debouncedSearch(q);
  };

  // initial load: show all products (optional)
  useEffect(() => {
    // fetch and show all on first render
    (async () => {
      if (!allProducts) {
        const products = await fetchAllProducts();
        if (products) setResults(products);
      }
    })();
    // intentionally empty deps to run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="space-y-6">
      <div className="bg-white p-4 rounded-md shadow-sm">
        <SearchBar onSearch={handleSearch} debounceDelay={400} />
        <p className="mt-2 text-xs text-gray-500">
          Tip: type a product title and click <strong>Search</strong>. Debounce prevents repeated rapid searches.
        </p>
      </div>

      <div>
        {loading && (
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-6 h-6 border-4 border-gray-300 rounded-full loader" />
            <span>Loading...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {results.length === 0 ? (
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded text-yellow-800">
                No products found {query ? `for "${query}"` : ""}.
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {results.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}