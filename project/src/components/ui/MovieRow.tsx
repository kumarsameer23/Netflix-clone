import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Movie } from '../../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow = ({ title, movies }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.9;
      
      const newScrollPosition = direction === 'left'
        ? scrollLeft - scrollAmount
        : scrollLeft + scrollAmount;
        
      rowRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
      
      // Update arrow visibility after scroll
      setTimeout(() => {
        if (rowRef.current) {
          setShowLeftArrow(rowRef.current.scrollLeft > 20);
          setShowRightArrow(rowRef.current.scrollLeft < (rowRef.current.scrollWidth - rowRef.current.clientWidth - 20));
        }
      }, 400);
    }
  };

  // Handle scroll events to update arrow visibility
  const handleScroll = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 20);
      setShowRightArrow(rowRef.current.scrollLeft < (rowRef.current.scrollWidth - rowRef.current.clientWidth - 20));
    }
  };

  // No movies to display
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h2 className="text-xl md:text-2xl font-medium text-netflix-light mb-4 pl-4 md:pl-8">
        {title}
      </h2>
      
      <div className="relative group">
        {/* Left Scroll Button */}
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
        )}
        
        {/* Movies Row */}
        <div 
          ref={rowRef} 
          className="flex overflow-x-scroll scrollbar-hide space-x-2 px-4 md:px-8 pb-4"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map(movie => (
            <div 
              key={movie.id} 
              className="flex-shrink-0 w-[150px] md:w-[200px]"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        
        {/* Right Scroll Button */}
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;