import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import LoadingSpinner from './components/LoadingSpinner';

function App(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-spred-dark flex items-center justify-center max-w-md mx-auto">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <svg width="42" height="48" viewBox="0 0 21 24" fill="none" className="animate-pulse">
              <path d="M8 16.5L13 12.2L8 7.5L13 3.2L8 0L0 7.5L0 12.2L8 16.5Z" fill="#F15A24"/>
              <path d="M8.3 9L13.5 4.8L8.3 0L13.5 4.8L8.3 9Z" fill="#F45303"/>
              <path d="M13 12.2L20.7 7L13 4.9L20.7 7L13 12.2Z" fill="#F15A24"/>
              <path d="M13 4.9L20.7 0L13 4.9Z" fill="#F15A24"/>
              <path d="M8 0L13 4.9L8 0Z" fill="#F15A24"/>
              <path d="M0 4.9L7.7 0L0 4.9Z" fill="#F15A24"/>
              <path d="M0 12.2L7.7 7L0 12.2Z" fill="#F15A24"/>
            </svg>
          </div>
          <LoadingSpinner />
          <p className="text-white text-sm">Loading Spred...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-spred-dark text-white max-w-md mx-auto relative overflow-hidden">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/watch/:movieId" element={<VideoPlayerScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
