import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import MovieCard from './MovieCard';

interface ContentSectionProps {
  title: string;
  movies: Array<{
    id: string;
    image: string;
    title?: string;
    genre?: string;
  }>;
  showMore?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, movies, showMore = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240; // Approximately 2 movie cards
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="px-4 animate-fadeIn">
      <div className="flex items-center justify-between bg-spred-gray px-4 py-3 mb-3 rounded">
        <h3 className="text-white text-sm font-bold tracking-wide">{title}</h3>
        {showMore && (
          <button 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="text-spred-orange text-xs font-medium">MORE</span>
            {isExpanded ? (
              <ChevronRight className="w-5 h-5 text-white" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white" />
            )}
          </button>
        )}
      </div>
      
      <div className="relative group">
        {/* Left Navigation Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Navigation Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
        
        {/* Horizontal scroll container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory scroll-smooth"
          onScroll={handleScroll}
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              className={`snap-start ${index === 2 ? 'w-28' : 'w-29'} flex-shrink-0`}
              showOverlay={true}
            />
          ))}
          
          {/* Padding element for better scrolling */}
          <div className="w-4 flex-shrink-0"></div>
        </div>
        
        {/* Enhanced scroll indicators with gradients */}
        {canScrollLeft && (
          <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-spred-dark via-spred-dark to-transparent pointer-events-none z-5"></div>
        )}
        {canScrollRight && (
          <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-spred-dark via-spred-dark to-transparent pointer-events-none z-5"></div>
        )}
      </div>

      {/* Scroll Progress Indicator */}
      <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div 
          className="h-full bg-spred-orange rounded-full transition-all duration-300"
          style={{
            width: `${((scrollContainerRef.current?.scrollLeft || 0) / 
              Math.max((scrollContainerRef.current?.scrollWidth || 1) - (scrollContainerRef.current?.clientWidth || 0), 1)) * 100}%`
          }}
        ></div>
      </div>
    </div>
  );
};

export default ContentSection;
