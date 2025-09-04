import React, { useState } from 'react';
import { Home, Camera, Plus, Library, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('HOME');

  const navItems = [
    { id: 'HOME', label: 'HOME', icon: Home },
    { id: 'SHORTS', label: 'SHORTS', icon: Camera },
    { id: 'UPLOAD', label: 'UPLOAD', icon: Plus },
    { id: 'LIBRARY', label: 'LIBRARY', icon: Library },
    { id: 'ME', label: 'ME', icon: User },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-800 to-black px-4 py-2 flex items-center justify-center gap-12 border-t border-gray-700">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              isActive ? 'transform scale-110' : 'hover:scale-105'
            }`}
          >
            <div className={`w-6 h-6 flex items-center justify-center relative ${
              isActive ? 'text-spred-orange' : 'text-white'
            }`}>
              <IconComponent 
                className="w-5 h-5"
                fill={isActive ? 'currentColor' : 'none'}
              />
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-spred-orange rounded-full"></div>
              )}
            </div>
            <span className={`text-xs font-medium transition-colors ${
              isActive ? 'text-spred-orange' : 'text-white'
            }`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
