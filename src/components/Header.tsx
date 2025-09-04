import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div className="flex items-center gap-2">
        {/* Spred Logo */}
        <div className="relative">
          <svg width="21" height="24" viewBox="0 0 21 24" fill="none">
            <path d="M8 16.5L13 12.2L8 7.5L13 3.2L8 0L0 7.5L0 12.2L8 16.5Z" fill="#F15A24"/>
            <path d="M8.3 9L13.5 4.8L8.3 0L13.5 4.8L8.3 9Z" fill="#F45303"/>
            <path d="M13 12.2L20.7 7L13 4.9L20.7 7L13 12.2Z" fill="#F15A24"/>
            <path d="M13 4.9L20.7 0L13 4.9Z" fill="#F15A24"/>
            <path d="M8 0L13 4.9L8 0Z" fill="#F15A24"/>
            <path d="M0 4.9L7.7 0L0 4.9Z" fill="#F15A24"/>
            <path d="M0 12.2L7.7 7L0 12.2Z" fill="#F15A24"/>
          </svg>
        </div>
        
        {/* Spred Text Logo */}
        <div className="text-white">
          <svg width="58" height="14" viewBox="0 0 58 14" fill="none">
            <path d="M0 0H10.5V14.3H0V0Z" fill="white"/>
            <path d="M11.9 0H22.3V14.3H11.9V0Z" fill="white"/>
            <path d="M22.9 0H34.1V14.3H22.9V0Z" fill="white"/>
            <path d="M34.9 0H45.2V14.3H34.9V0Z" fill="white"/>
            <path d="M46.2 0H58.4V14.3H46.2V0Z" fill="white"/>
          </svg>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors">
          <Search className="w-6 h-6 text-white" />
        </button>
        
        <button 
          className="p-1 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors relative"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-spred-orange rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </button>
        
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-spred-orange hover:border-spred-orange-light transition-colors cursor-pointer">
          <img 
            src="https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/246e/2436/84dff5f20ec6c12c962d377f4eae284d?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lqeqrZQpAbkYvVkGRaq7tWwMmb8Eq0n66Tvbqru5nAaNGK2B2JTnHGkRZkoc6LedCJZhenZvGkNsYNl7rWmwUQ1cx0Syj1DqkWyyUlMtL0zeh2kdOsD6b7CSvEcV1OY7pF6jZYu1B4MgtswgTRTwDE8p6-uPdo1WeMZkjkXDk6J-TTX1jmYZ6oGOU49HSRS1nHoFRnzMLNrRmLfMHr20DM6ovgx8fodogilahEODM6aHUOOExN8Kld~vuGeDaGVWWyY2q0OMHozeQcutlwdDWVKHylUQC5PeSQvyg2X8Nrfz4FZvnR-lXxFOeji~7irG0SQRHi5q2rFAB07XaflSRg__" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
