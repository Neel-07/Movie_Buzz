import React, { useState } from 'react';
import { Navbar } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { MovieGrid } from './components/movie-grid';
import { MovieDetailsModal } from './components/movie-details-modal';
import { SearchBar } from './components/search-bar';
import { searchMovies, getMovieDetails, type Movie } from './lib/api';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setIsLoading(false);
  };

  const handleMovieClick = async (movie: Movie) => {
    const details = await getMovieDetails(movie.imdbID);
    if (details) {
      setSelectedMovie(details);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar>
        <SearchBar onSearch={handleSearch} />
      </Navbar>
      <main className="pt-16">
        <HeroSection />
        <MovieGrid
          title={movies.length > 0 ? 'Search Results' : 'Popular Movies'}
          movies={movies}
          isLoading={isLoading}
          onMovieClick={handleMovieClick}
        />
        {selectedMovie && (
          <MovieDetailsModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;