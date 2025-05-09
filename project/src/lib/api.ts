import axios from 'axios';
import { Movie, MovieDetails, Genre } from '../types';

// Note: In a real application, you'd store these in environment variables
const API_KEY = 'b9a5e691d8b55f4747e5fa5e34814893';
const BASE_URL = 'https://api.themoviedb.org/3';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Get trending movies
export const getTrending = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Get movies by genre
export const getMoviesByGenre = async (genreId: number, page = 1): Promise<Movie[]> => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movies for genre ${genreId}:`, error);
    return [];
  }
};

// Get movie details
export const getMovieDetails = async (movieId: string): Promise<MovieDetails | null> => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos,credits,similar',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ${movieId}:`, error);
    return null;
  }
};

// Search movies
export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query) return [];
  
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// Get genres
export const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

export default api;