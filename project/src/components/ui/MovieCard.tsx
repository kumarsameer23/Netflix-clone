import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, Info } from 'lucide-react';
import { Movie } from '../../types';

interface MovieCardProps {
  movie: Movie;
  isFeatured?: boolean;
}

const MovieCard = ({ movie, isFeatured = false }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = `https://image.tmdb.org/t/p/${isFeatured ? 'w780' : 'w342'}${movie.poster_path}`;
  const rating = Math.round(movie.vote_average * 10) / 10;
  
  const cardClasses = isFeatured
    ? 'rounded-lg overflow-hidden relative card-hover cursor-pointer w-full'
    : 'rounded-md overflow-hidden relative card-hover cursor-pointer w-full';

  return (
    <div 
      className={cardClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`}>
        <img 
          src={imageUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </Link>
      
      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/60 flex flex-col p-3 animate-fade-in">
          <h3 className="text-white font-medium truncate">{movie.title}</h3>
          
          {/* Info Row */}
          <div className="flex items-center mt-2 text-sm space-x-2 text-netflix-light">
            <span className={`px-1 rounded ${rating >= 7 ? 'bg-green-600' : rating >= 5 ? 'bg-yellow-600' : 'bg-red-600'}`}>
              {rating}
            </span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          
          {/* Actions */}
          <div className="mt-auto flex space-x-1">
            <Link 
              to={`/movie/${movie.id}`} 
              className="rounded-full bg-white p-1 text-black hover:bg-netflix-red hover:text-white transition-colors"
            >
              <Play size={16} />
            </Link>
            <button className="rounded-full bg-netflix-dark p-1 text-white hover:bg-netflix-red transition-colors">
              <Plus size={16} />
            </button>
            <button className="rounded-full bg-netflix-dark p-1 text-white hover:bg-netflix-red transition-colors">
              <ThumbsUp size={16} />
            </button>
            <Link 
              to={`/movie/${movie.id}`} 
              className="rounded-full bg-netflix-dark p-1 text-white hover:bg-netflix-red transition-colors ml-auto"
            >
              <Info size={16} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;