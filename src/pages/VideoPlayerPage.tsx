import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, Settings, MoreHorizontal, AlertTriangle } from 'lucide-react';
import { getMovieById, movies, Movie } from '../data/db';
import ContentSection from '../components/ContentSection';

const VideoPlayerPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  
  const movieData = useMemo(() => movieId ? getMovieById(movieId) : undefined, [movieId]);

  const recommendedMovies = useMemo(() => {
    if (!movieData) return [];
    return movies.filter(
      (m: Movie) => m.category === movieData.category && m.id !== movieData.id
    ).slice(0, 5); // Show up to 5 recommendations
  }, [movieData]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(200); // Mock duration
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    // When the route changes, reset the player state
    setIsPlaying(false);
    setCurrentTime(0);
    setShowControls(true);

    if (movieData) {
      // Simulate parsing duration like "2h 15m" into seconds
      const parts = movieData.duration.split(' ');
      let totalSeconds = 0;
      parts.forEach(part => {
        if (part.includes('h')) {
          totalSeconds += parseInt(part.replace('h', '')) * 3600;
        }
        if (part.includes('m')) {
          totalSeconds += parseInt(part.replace('m', '')) * 60;
        }
      });
      setDuration(totalSeconds > 0 ? totalSeconds : 200);
    }
  }, [movieData]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => (prev < duration ? prev + 1 : prev));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (!movieData) {
    return (
      <div className="min-h-screen bg-black text-white max-w-md mx-auto flex flex-col items-center justify-center gap-4 p-4">
        <AlertTriangle className="w-16 h-16 text-spred-orange" />
        <h1 className="text-2xl font-bold">Movie Not Found</h1>
        <p className="text-gray-400 text-center">Sorry, we couldn't find the movie you were looking for.</p>
        <button
          onClick={handleGoBack}
          className="mt-4 bg-spred-orange hover:bg-spred-orange-light transition-colors text-white font-medium px-6 py-2 rounded flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spred-dark text-white max-w-md mx-auto relative overflow-y-auto scrollbar-hide">
      {/* Video Player Section */}
      <div 
        className="relative w-full h-64 md:h-80 bg-black overflow-hidden cursor-pointer"
        onClick={() => setShowControls(!showControls)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={movieData.image}
            alt={movieData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        <div className={`absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={handlePlayPause}
            className={`bg-spred-orange hover:bg-spred-orange-light text-white p-6 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl ${showControls ? 'opacity-100' : 'opacity-0'}`}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8" fill="currentColor" />
            )}
          </button>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-2">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #F45303 0%, #F45303 ${(currentTime / duration) * 100}%, #4a5568 ${(currentTime / duration) * 100}%, #4a5568 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlayPause}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors">
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Info and Recommendations Section */}
      <div className="p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{movieData.title}</h1>
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray-300 mb-3">
            <span className="bg-spred-orange px-2 py-1 rounded text-xs font-bold text-white">HD</span>
            <span>{movieData.year}</span>
            <span>•</span>
            <span>{movieData.duration}</span>
            <span>•</span>
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold flex items-center gap-1">★ {movieData.rating}</span>
          </div>
          <p className="text-sm text-gray-300 line-clamp-3">{movieData.description}</p>
        </div>
        
        {recommendedMovies.length > 0 && (
          <ContentSection 
            title="More Like This"
            movies={recommendedMovies}
            showMore={false}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayerPage;
