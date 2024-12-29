const OMDB_API_KEY = '57e8ebfc';
const OMDB_API_URL = 'https://www.omdbapi.com';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbRating?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${OMDB_API_URL}/?apikey=${OMDB_API_KEY}&s=${query}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (imdbId: string): Promise<Movie | null> => {
  try {
    const response = await fetch(`${OMDB_API_URL}/?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const getTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const queries = ['marvel', 'star wars', 'harry potter', 'lord of the rings'];
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    const response = await fetch(`${OMDB_API_URL}/?apikey=${OMDB_API_KEY}&s=${randomQuery}&type=movie`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

export const getTrendingTVShows = async (): Promise<Movie[]> => {
  try {
    const queries = ['game of thrones', 'breaking bad', 'friends', 'stranger things'];
    const randomQuery = queries[Math.floor(Math.random() * queries.length)];
    const response = await fetch(`${OMDB_API_URL}/?apikey=${OMDB_API_KEY}&s=${randomQuery}&type=series`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error('Error fetching trending TV shows:', error);
    return [];
  }
};

export const getMovieTrailer = async (title: string): Promise<string | null> => {
  try {
    // Since we don't have a YouTube API key, we'll generate a search URL
    const searchQuery = encodeURIComponent(`${title} official trailer`);
    return `https://www.youtube.com/results?search_query=${searchQuery}`;
  } catch (error) {
    console.error('Error generating trailer link:', error);
    return null;
  }
};