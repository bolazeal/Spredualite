import React, { useState } from 'react';

const NavigationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ORIGINAL');
  
  const tabs = ['ORIGINAL', 'MOVIES', 'SERIES', 'CATEGORIES'];

  return (
    <div className="flex items-center justify-center gap-10 px-4 py-3 bg-spred-gray">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-sm font-semibold tracking-wide transition-all duration-200 relative ${
            activeTab === tab ? 'text-spred-orange' : 'text-spred-light-gray hover:text-white'
          }`}
        >
          {tab}
          {activeTab === tab && (
            <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-spred-orange rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
