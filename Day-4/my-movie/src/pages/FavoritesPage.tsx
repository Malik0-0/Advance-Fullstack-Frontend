import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path?: string | null;
  release_date?: string;
};

export default function FavoritesPage() {
  const [favs, setFavs] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // The easiest: fetch details for each fav by hitting /movie/{id}
    async function load() {
      const key = import.meta.env.VITE_TMDB_API_KEY;
      const results: Movie[] = [];
      for (const id of favs) {
        try {
          const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`);
          if (res.ok) {
            results.push(await res.json());
          }
        } catch {}
      }
      setMovies(results);
    }
    load();
  }, [favs]);

  function toggleFav(movie: Movie) {
    setFavs((cur) => (cur.includes(movie.id) ? cur.filter((id) => id !== movie.id) : [...cur, movie.id]));
    // update localStorage
    setTimeout(() => localStorage.setItem("favorites", JSON.stringify(favs)), 0);
  }

  if (!favs.length) return <div className="p-6 text-center">No favorites yet.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Your Favorites</h2>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-6xl mx-auto">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} onToggleFav={toggleFav} isFav={favs.includes(m.id)} />
        ))}
      </div>
    </div>
  );
}