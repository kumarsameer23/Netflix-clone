import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, Share2, ChevronLeft } from 'lucide-react';
import { getMovieDetails } from '../lib/api';
import { MovieDetails as MovieDetailsType } from '../types';
import LoadingScreen from '../components/ui/LoadingScreen';
import MovieRow from '../components/ui/MovieRow';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const details = await getMovieDetails(id);
        setMovie(details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
    // Scroll to top when navigating to a new movie
    window.scrollTo(0, 0);
  }, [id]);
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  if (!movie) {
    return (
      <div className="pt-24 text-center min-h-screen">
        <p className="text-netflix-gray text-xl">Movie not found</p>
        <Link to="/browse" className="netflix-btn mt-6 inline-block">
          Back to Browse
        </Link>
      </div>
    );
  }
  
  // Format runtime to hours and minutes
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const formattedRuntime = `${hours}h ${minutes}m`;
  
  // Get trailer if available
  const trailer = movie.videos.results.find(
    video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  );
  
  // Get director
  const director = movie.credits.crew.find(person => person.job === 'Director');
  
  // Get top cast (limit to 6)
  const topCast = movie.credits.cast.slice(0, 6);
  
  return (
    <div className="min-h-screen">
      {/* Backdrop & Hero Section */}
      <div className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img 
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/50 to-transparent"></div>
        </div>
        
        <Link to="/browse" className="absolute top-24 left-4 md:left-8 bg-black/50 p-2 rounded-full hover:bg-netflix-red transition-colors">
          <ChevronLeft size={24} />
        </Link>
        
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
          
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <span className="text-green-500">
              {Math.round(movie.vote_average * 10)}% Match
            </span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>{formattedRuntime}</span>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <button className="netflix-btn flex items-center space-x-2">
              <Play size={18} className="fill-current" />
              <span>Play</span>
            </button>
            <button className="netflix-btn-secondary flex items-center space-x-2">
              <Plus size={18} />
              <span>My List</span>
            </button>
            <button className="netflix-btn-secondary p-2 rounded-full">
              <ThumbsUp size={18} />
            </button>
            <button className="netflix-btn-secondary p-2 rounded-full">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Movie Info Section */}
      <div className="container-fluid max-w-6xl grid md:grid-cols-3 gap-8 py-8">
        <div className="md:col-span-2">
          <p className="text-netflix-light mb-6">{movie.overview}</p>
          
          {/* Trailer Section */}
          {trailer && (
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4">Trailer</h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
        
        <div>
          {/* Cast & Crew */}
          <div className="mb-6">
            <h3 className="text-netflix-gray mb-2">Cast</h3>
            <p className="text-netflix-light">
              {topCast.map(person => person.name).join(', ')}
            </p>
          </div>
          
          {director && (
            <div className="mb-6">
              <h3 className="text-netflix-gray mb-2">Director</h3>
              <p className="text-netflix-light">{director.name}</p>
            </div>
          )}
          
          {/* Genres */}
          <div className="mb-6">
            <h3 className="text-netflix-gray mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map(genre => (
                <Link 
                  key={genre.id} 
                  to={`/browse?genre=${genre.id}`}
                  className="bg-netflix-dark px-3 py-1 rounded-full text-sm hover:bg-netflix-red transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Movies */}
      {movie.similar.results.length > 0 && (
        <div className="container-fluid pb-12">
          <h2 className="text-2xl font-medium mb-4">More Like This</h2>
          <MovieRow title="" movies={movie.similar.results} />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;