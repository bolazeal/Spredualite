import React, { useState, useEffect, useMemo } from 'react';
import StatusBar from '../components/StatusBar';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import FeaturedContent from '../components/FeaturedContent';
import ContentSection from '../components/ContentSection';
import BottomNavigation from '../components/BottomNavigation';
import ScrollToTop from '../components/ScrollToTop';
import { movies } from '../services/movieService';

const HomeScreen: React.FC = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topSpredOriginals = useMemo(() => movies.filter(m => m.category === 'original').slice(0, 5), []);
  const topNaija = useMemo(() => movies.filter(m => m.category === 'naija').slice(0, 4), []);
  const trendingSkits = useMemo(() => movies.filter(m => m.category === 'skit').slice(0, 4), []);
  const newReleases = useMemo(() => movies.filter(m => m.category === 'new').slice(0, 4), []);
  const actionMovies = useMemo(() => movies.filter(m => m.category === 'action').slice(0, 4), []);
  const documentaries = useMemo(() => movies.filter(m => m.category === 'documentary').slice(0, 4), []);

  return (
    <div className="min-h-screen bg-spred-dark smooth-scroll">
      {/* Fixed Header Section */}
      <div className="sticky top-0 z-30 bg-spred-dark">
        <StatusBar />
        <Header />
        <NavigationTabs />
      </div>

      {/* Scrollable Content */}
      <div className="pb-20 gpu-accelerated">
        <FeaturedContent />
        
        <div className="space-y-6 mt-6">
          <ContentSection 
            title="TOP SPRED ORIGINALS" 
            movies={topSpredOriginals}
            showMore={true}
          />
          
          <ContentSection 
            title="TOP NAIJA" 
            movies={topNaija}
            showMore={true}
          />
          
          <ContentSection 
            title="TRENDING SKITS" 
            movies={trendingSkits}
            showMore={true}
          />

          <ContentSection 
            title="NEW RELEASES" 
            movies={newReleases}
            showMore={true}
          />

          <ContentSection 
            title="ACTION MOVIES" 
            movies={actionMovies}
            showMore={true}
          />

          <ContentSection 
            title="DOCUMENTARIES" 
            movies={documentaries}
            showMore={true}
          />
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto">
        <BottomNavigation />
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && <ScrollToTop />}
    </div>
  );
};

export default HomeScreen;
