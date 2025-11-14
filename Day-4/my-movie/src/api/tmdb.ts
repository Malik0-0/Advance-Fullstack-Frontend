export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export function posterUrl(path?: string) {
  return path ? `${IMG_BASE}${path}` : "/placeholder.png";
}

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(`${BASE}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  return res.json();
}

export async function searchMovies(query: string, page = 1) {
  if (!query) return { results: [] };
  const res = await fetch(`${BASE}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`);
  if (!res.ok) throw new Error("Failed to search movies");
  return res.json();
}