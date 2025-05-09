import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/ui/HeroSection';
import MovieRow from '../components/ui/MovieRow';
import LoadingScreen from '../components/ui/LoadingScreen';
import { Movie, Genre } from '../types';
import { getTrending, getMoviesByGenre, searchMovies, getGenres } from '../lib/api';

const Browse = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [romanceMovies, setRomanceMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const genreId = searchParams.get('genre');

  // Fetch movie data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Reset states when search or genre changes
        setShowSearchResults(false);
        setSelectedGenre(null);
        
        // Get all genres for filtering
        const genresData = await getGenres();
        setGenres(genresData);
        
        if (searchQuery) {
          // Search mode
          const results = await searchMovies(searchQuery);
          setSearchResults(results);
          setShowSearchResults(true);
        } else if (genreId) {
          // Genre filtering mode
          const genreIdNum = parseInt(genreId, 10);
          const selectedGenre = genresData.find(g => g.id === genreIdNum);
          if (selectedGenre) {
            setSelectedGenre(selectedGenre);
            const movies = await getMoviesByGenre(genreIdNum);
            setGenreMovies(movies);
          }
        } else {
          // Default browse mode - load all categories
          const trending = await getTrending();
          setTrendingMovies(trending);
          
          // Set a random trending movie as featured
          if (trending.length > 0) {
            const randomIndex = Math.floor(Math.random() * Math.min(5, trending.length));
            setFeaturedMovie(trending[randomIndex]);
          }
          
          // Load genre-specific rows
          const action = await getMoviesByGenre(28); // Action genre ID
          setActionMovies(action);
          
          const comedy = await getMoviesByGenre(35); // Comedy genre ID
          setComedyMovies(comedy);
          
          const horror = await getMoviesByGenre(27); // Horror genre ID
          setHorrorMovies(horror);
          
          const romance = await getMoviesByGenre(10749); // Romance genre ID
          setRomanceMovies(romance);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [searchQuery, genreId]);

  if (loading) {
    return <LoadingScreen />;
  }

  // Search results view
  if (showSearchResults) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="container-fluid">
          <h1 className="text-2xl md:text-3xl font-medium mb-6">
            Search Results for "{searchQuery}"
          </h1>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.map(movie => (
                <div key={movie.id} className="aspect-[2/3]">
                  <img 
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-md hover:opacity-80 transition duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-netflix-gray text-xl">
                No results found for "{searchQuery}"
              </p>
              <p className="text-netflix-gray mt-2">
                Please try a different search term.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Genre filtering view
  if (selectedGenre) {
    return (
      <div className="pt-24 min-h-screen">
        <div className="container-fluid">
          <h1 className="text-2xl md:text-3xl font-medium mb-6">
            {selectedGenre.name} Movies
          </h1>
          
          {genreMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {genreMovies.map(movie => (
                <div key={movie.id} className="aspect-[2/3]">
                  <img 
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-md hover:opacity-80 transition duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-netflix-gray text-xl">
                No {selectedGenre.name} movies found
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default browse view with rows of different categories
  return (
    <div className="min-h-screen pb-12">
      {featuredMovie && <HeroSection movie={featuredMovie} />}
      
      <div className="mt-8">
        <MovieRow title="Trending Now" movies={trendingMovies} />
        <MovieRow title="Action Movies" movies={actionMovies} />
        <MovieRow title="Comedies" movies={comedyMovies} />
        <MovieRow title="Horror" movies={horrorMovies} />
        <MovieRow title="Romance" movies={romanceMovies} />
      </div>
    </div>
  );
};

export default Browse;