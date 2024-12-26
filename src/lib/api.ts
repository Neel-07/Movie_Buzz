import { YOUTUBE_API_KEY } from './constants';

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

export const getMovieTrailer = async (title: string): Promise<string | null> => {
  try {
    const query = `${title} official trailer`;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&key=${YOUTUBE_API_KEY}&type=video&maxResults=1`
    );
    const data = await response.json();
    if (data.items?.[0]) {
      return `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
    }
    return null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};