import { X } from 'lucide-react';
import { Movie } from '@/lib/api';
import { useEffect, useState } from 'react';
import { getMovieTrailer } from '@/lib/api';

interface MovieDetailsModalProps {
  movie: Movie;
  onClose: () => void;
}

export const MovieDetailsModal = ({ movie, onClose }: MovieDetailsModalProps) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const url = await getMovieTrailer(movie.Title);
      setTrailerUrl(url);
    };
    fetchTrailer();
  }, [movie.Title]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="relative bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col md:flex-row gap-6 p-6">
          <div className="w-full md:w-1/3">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.Title}
              className="w-full rounded-lg"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-yellow-400">★ {movie.imdbRating}</span>
              <span className="text-gray-400">{movie.Year}</span>
              <span className="text-gray-400">{movie.Genre}</span>
            </div>
            
            <p className="text-gray-300 mb-6">{movie.Plot}</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">Director</h3>
                <p className="text-gray-300">{movie.Director}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-1">Cast</h3>
                <p className="text-gray-300">{movie.Actors}</p>
              </div>
              
              {trailerUrl && (
                <a
                  href={trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};