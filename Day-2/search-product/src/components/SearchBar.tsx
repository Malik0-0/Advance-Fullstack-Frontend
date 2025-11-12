import React, { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
  defaultQuery?: string;
  debounceDelay?: number;
};

export default function SearchBar({ onSearch, defaultQuery = "", debounceDelay = 300 }: Props) {
  const [query, setQuery] = useState(defaultQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products by title..."
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-label="Search products"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        aria-label="Search"
        title={`Debounced (${debounceDelay}ms)`}
      >
        Search
      </button>
    </form>
  );
}