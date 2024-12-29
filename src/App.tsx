import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { MovieGrid } from './components/movie-grid';
import { MovieDetailsModal } from './components/movie-details-modal';
import { SearchBar } from './components/search-bar';
import { RootState, AppDispatch } from './store/store'; // Import AppDispatch
import { Movie } from './lib/api';
import { 
  fetchMovies, 
  searchMoviesAsync, 
  getMovieDetailsAsync, 
  clearSelectedMovie 
} from './store/moviesSlice';

const App: React.FC = () => {
  // Use typed dispatch
  const dispatch: AppDispatch = useDispatch();
  const { 
    movies, 
    selectedMovie, 
    isLoading, 
    contentType, 
    searchResults 
  } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies('movies'));
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(searchMoviesAsync(query));
  };

  const handleMovieClick = (movie: Movie) => {
    dispatch(getMovieDetailsAsync(movie.imdbID));
  };

  const handleNavItemClick = (type: 'movies' | 'tvshows' | 'watchlist') => {
    dispatch(fetchMovies(type));
  };

  const getContentTitle = () => {
    switch (contentType) {
      case 'movies':
        return 'Popular Movies';
      case 'tvshows':
        return 'Popular TV Shows';
      case 'watchlist':
        return 'Your Watchlist';
      case 'search':
        return 'Search Results';
      default:
        return 'Trending Now';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onSearch={handleSearch} onNavItemClick={handleNavItemClick}>
        <SearchBar onSearch={handleSearch} />
      </Navbar>
      <main className="pt-16">
        <HeroSection />
        {/* Mobile/Tablet Search Bar */}
        <div className="min-[1100px]:hidden px-4 -mt-12 mb-8">
          <div className="max-w-md mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <MovieGrid
          title={getContentTitle()}
          movies={contentType === 'search' ? searchResults : movies}
          isLoading={isLoading}
          onMovieClick={handleMovieClick}
        />
        {selectedMovie && (
          <MovieDetailsModal
            movie={selectedMovie}
            onClose={() => dispatch(clearSelectedMovie())}
          />
        )}
      </main>
    </div>
  );
};

export default App;
