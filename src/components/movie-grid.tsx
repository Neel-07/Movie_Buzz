import { MovieCard } from './movie-card';
import type { Movie } from '@/lib/api';

interface MovieGridProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  onMovieClick: (movie: Movie) => void;
}

export const MovieGrid = ({ title, movies, isLoading = false, onMovieClick }: MovieGridProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <MovieCard key={i} movie={{} as Movie} onClick={() => {}} isLoading />
          ))
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={onMovieClick}
            />
          ))
        )}
      </div>
    </div>
  );
};