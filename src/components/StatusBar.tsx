import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

const StatusBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-4 pt-3 pb-1 text-white">
      <div className="flex items-center">
        <span className="text-sm font-semibold">12:45</span>
      </div>
      <div className="w-[124px]"></div>
      <div className="flex items-center gap-2">
        <Signal className="w-4 h-3 text-white" fill="currentColor" />
        <Wifi className="w-4 h-3 text-white" fill="currentColor" />
        <Battery className="w-6 h-3 text-white" fill="currentColor" />
      </div>
    </div>
  );
};

export default StatusBar;
