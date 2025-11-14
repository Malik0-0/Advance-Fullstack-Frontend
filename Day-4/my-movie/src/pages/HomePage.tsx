import { useEffect, useState } from "react";
import { fetchPopularMovies, searchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "../hooks/useDebounce";

type Movie = {
  id: number;
  title: string;
  poster_path?: string | null;
  release_date?: string;
  overview?: string;
};

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
    }
  }, [favorites]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    async function load() {
      try {
        if (debouncedQuery) {
          // search expects (query: string, page?: number)
          const data: any = await searchMovies(debouncedQuery, 1);
          if (active) setMovies(data.results || []);
        } else {
          // fetchPopularMovies expects (page?: number)
          const data: any = await fetchPopularMovies(page);
          if (active) setMovies(data.results || []);
        }
      } catch (err) {
        console.error("Failed to load movies:", err);
        if (active) setMovies([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [debouncedQuery, page]);

  function toggleFav(m: Movie) {
    setFavorites((cur) => (cur.includes(m.id) ? cur.filter((id) => id !== m.id) : [...cur, m.id]));
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto mb-6">
        <SearchInput value={query} onChange={setQuery} />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-6xl mx-auto">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} onToggleFav={toggleFav} isFav={favorites.includes(m.id)} />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-3 mt-8">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded border">
          Prev
        </button>
        <button onClick={() => setPage((p) => p + 1)} className="px-3 py-1 rounded border">
          Next
        </button>
      </div>
    </div>
  );
}