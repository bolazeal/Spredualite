import React from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-4 z-50 bg-spred-orange hover:bg-spred-orange-light text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-fadeIn"
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;
