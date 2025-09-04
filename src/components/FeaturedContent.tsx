import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import { movies as allMovies } from '../services/movieService';

const FeaturedContent: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const featuredMovies = useMemo(() => allMovies.filter(m => m.featured), []);

  const handleWatchNow = (movieId: string) => {
    navigate(`/watch/${movieId}`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, you'd implement the action here (e.g., add to list)
    console.log('Action button clicked, navigation prevented.');
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      const newIndex = Math.round(scrollLeft / clientWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - containerWidth 
        : currentScroll + containerWidth;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: index * containerWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mx-4 mt-3 group">
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Previous featured content"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Next featured content"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory rounded-lg"
          onScroll={handleScroll}
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {featuredMovies.map((movie, index) => (
            <div key={movie.id} className="relative h-52 w-full flex-shrink-0 snap-start">
              {isLoading && index === 0 && (
                <div className="absolute inset-0 bg-spred-gray flex items-center justify-center z-10">
                  <LoadingSpinner />
                </div>
              )}
              
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onLoad={() => index === 0 && setIsLoading(false)}
                onError={() => index === 0 && setIsLoading(false)}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button 
                  onClick={() => handleWatchNow(movie.id)}
                  className="bg-spred-orange text-white p-4 rounded-full hover:bg-spred-orange-light transition-all duration-200 hover:scale-110 shadow-xl"
                >
                  <Play className="w-8 h-8" fill="currentColor" />
                </button>
              </div>
              
              <div className="absolute bottom-3 left-3 right-3">
                <div className="mb-3">
                  <h2 className="text-white text-xl font-extrabold drop-shadow-lg mb-1">{movie.title}</h2>
                  <p className="text-white text-xs font-light mb-2">{movie.genre}</p>
                  <p className="text-white text-sm font-light mb-3 line-clamp-2 opacity-90">{movie.description}</p>
                  <div className="flex items-center gap-2 text-white text-xs">
                    <span className="bg-spred-orange px-2 py-1 rounded text-xs font-bold">HD</span>
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.duration}</span>
                    <span>•</span>
                    <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">★ {movie.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 flex-wrap">
                  <button 
                    onClick={() => handleWatchNow(movie.id)}
                    className="bg-spred-orange hover:bg-spred-orange-light transition-colors text-white text-xs font-medium px-6 py-2 rounded flex items-center gap-2 shadow-lg"
                  >
                    <Play className="w-4 h-4" fill="currentColor" />
                    WATCH NOW
                  </button>
                  <button 
                    onClick={handleActionClick}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white text-xs font-medium px-4 py-2 rounded flex items-center gap-2 backdrop-blur-sm"
                  >
                    <Plus className="w-4 h-4" />
                    MY LIST
                  </button>
                  <button 
                    onClick={handleActionClick}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white text-xs font-medium px-4 py-2 rounded flex items-center gap-2 backdrop-blur-sm"
                  >
                    <Info className="w-4 h-4" />
                    MORE INFO
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 right-4 flex items-center gap-2 z-10">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-spred-orange w-4' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to featured content ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-30">
          <div 
            className="h-full bg-spred-orange transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / featuredMovies.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
