import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Info } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface MovieCardProps {
  movie: {
    id: string;
    image: string;
    title?: string;
    genre?: string;
  };
  className?: string;
  showOverlay?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, className = '', showOverlay = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/watch/${movie.id}`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, you'd implement the action here (e.g., add to list)
    console.log('Action button clicked, navigation prevented.');
  };

  return (
    <div 
      className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer select-none ${className} ${isHovered ? 'scale-105 shadow-xl shadow-black/50' : 'hover:scale-102'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ touchAction: 'manipulation' }}
      onClick={handleNavigate}
    >
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-spred-gray flex items-center justify-center z-10">
            <LoadingSpinner />
          </div>
        )}
        <img
          src={movie.image}
          alt={movie.title || `Movie ${movie.id}`}
          className="w-full h-43 object-cover transition-all duration-300"
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          draggable={false}
        />
        
        {showOverlay && isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3">
            <div className="flex justify-end">
              <button onClick={handleActionClick} className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-center">
              <button className="bg-spred-orange hover:bg-spred-orange-light text-white p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg">
                <Play className="w-6 h-6" fill="currentColor" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <button onClick={handleActionClick} className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200">
                <Info className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                <span className="text-white text-xs">★</span>
                <span className="text-white text-xs font-medium">8.2</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {movie.title && (
        <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-t from-black/80 to-transparent p-2 rounded">
          <h4 className="text-white text-sm font-extrabold drop-shadow-lg mb-1 line-clamp-1">{movie.title}</h4>
          {movie.genre && (
            <p className="text-white text-xs font-light mb-2 line-clamp-1 opacity-90">{movie.genre}</p>
          )}
          <div className="flex items-center gap-2">
            <div className="bg-white rounded p-1 flex-shrink-0">
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                <path d="M7 9L7 0L0 9L7 9Z" fill="#F45303"/>
              </svg>
            </div>
            <button className="bg-spred-orange hover:bg-spred-orange-light transition-colors px-3 py-1 rounded text-white text-xs font-medium shadow-lg">
              WATCH NOW
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
