import { Play } from 'lucide-react';
import { Movie } from '@/lib/api';
import { Skeleton } from './ui/skeleton';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  isLoading?: boolean;
}

export const MovieCard = ({ movie, onClick, isLoading = false }: MovieCardProps) => {
  if (isLoading) {
    return <Skeleton className="w-full h-[400px] rounded-lg" />;
  }

  return (
    <div 
      className="bg-black rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => onClick(movie)}
    >
      <div className="relative overflow-hidden">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.Title}
          className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg">{movie.Title}</h3>
            <div className="flex items-center justify-between mt-2">
              {movie.imdbRating && <span className="text-yellow-400">★ {movie.imdbRating}</span>}
              <span className="text-gray-300">{movie.Year}</span>
            </div>
            <button className="mt-3 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
              <Play size={16} />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};