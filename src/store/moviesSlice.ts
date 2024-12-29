import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  searchMovies, 
  getMovieDetails, 
  getTrendingMovies, 
  getTrendingTVShows,
  type Movie 
} from '@/lib/api';

interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie | null;
  isLoading: boolean;
  contentType: 'trending' | 'movies' | 'tvshows' | 'watchlist' | 'search';
  searchResults: Movie[];
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  isLoading: false,
  contentType: 'trending',
  searchResults: [],
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (type: 'movies' | 'tvshows' | 'watchlist') => {
    switch (type) {
      case 'movies':
        return await getTrendingMovies();
      case 'tvshows':
        return await getTrendingTVShows();
      case 'watchlist':
        return await getTrendingMovies();
      default:
        return [];
    }
  }
);

export const searchMoviesAsync = createAsyncThunk(
  'movies/searchMovies',
  async (query: string) => {
    return await searchMovies(query);
  }
);

export const getMovieDetailsAsync = createAsyncThunk(
  'movies/getMovieDetails',
  async (imdbId: string) => {
    return await getMovieDetails(imdbId);
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(searchMoviesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchMoviesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
        state.contentType = 'search';
      })
      .addCase(getMovieDetailsAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.selectedMovie = action.payload;
        }
      });
  },
});

export const { clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;