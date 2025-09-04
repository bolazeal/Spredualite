import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="inline-block w-4 h-4 border-2 border-spred-orange border-r-transparent rounded-full animate-spin"></div>
  );
};

export default LoadingSpinner;
