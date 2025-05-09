import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { Movie } from '../../types';

interface HeroSectionProps {
  movie: Movie;
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  useEffect(() => {
    const img = new Image();
    img.src = backdropUrl;
    img.onload = () => setIsLoaded(true);
  }, [backdropUrl]);

  // Extract year from release date
  const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <div className="relative h-[80vh] min-h-[500px] overflow-hidden">
      {/* Backdrop Image */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black/80 via-netflix-black/30 to-transparent" />
        <img 
          src={backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container-fluid relative h-full flex flex-col justify-center space-y-4 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-white animate-slide-up">
          {movie.title}
        </h1>
        <div className="flex items-center space-x-4 text-sm text-netflix-light animate-slide-up">
          <span className="text-green-500 font-medium">
            {Math.round(movie.vote_average * 10)}% Match
          </span>
          <span>{releaseYear}</span>
        </div>
        <p className="text-netflix-light max-w-xl line-clamp-3 md:line-clamp-4 animate-slide-up">
          {movie.overview}
        </p>
        <div className="flex flex-wrap gap-3 animate-slide-up">
          <Link to={`/movie/${movie.id}`} className="netflix-btn flex items-center space-x-2">
            <Play size={18} className="fill-current" />
            <span>Play</span>
          </Link>
          <Link to={`/movie/${movie.id}`} className="netflix-btn-secondary flex items-center space-x-2">
            <Info size={18} />
            <span>More Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;