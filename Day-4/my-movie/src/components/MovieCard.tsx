import { posterUrl } from "../api/tmdb";

type Movie = {
  id: number;
  title: string;
  poster_path?: string | null;
  release_date?: string;
  overview?: string;
};

export default function MovieCard({ movie, onToggleFav, isFav }: {
  movie: Movie;
  onToggleFav: (m: Movie) => void;
  isFav: boolean;
}) {
  return (
    <div className="bg-[var(--card-bg)] text-[var(--text-primary)] rounded-2xl shadow-md overflow-hidden transform transition hover:-translate-y-1 focus-within:-translate-y-1 outline-none">
      <img
        src={posterUrl(movie.poster_path || undefined)}
        alt={movie.title}
        className="w-full h-72 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        <p className="text-sm text-gray-500 truncate">{movie.release_date}</p>
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => onToggleFav(movie)}
                      className={`px-3 py-1 rounded-lg text-sm border focus:ring-2 focus:ring-offset-1 ${isFav ? "bg-gray-200 dark:bg-gray-700 text-black" : "bg-white dark:bg-black text-black"}`}
            aria-pressed={isFav}
          >
            {isFav ? "Remove Favorite" : "Add Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}