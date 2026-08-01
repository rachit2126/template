import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function AnnouncementBanner({ onExplore }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white text-xs sm:text-sm font-medium py-2 px-4 flex items-center justify-between relative z-50 shadow-md">
      <div className="flex-1 flex items-center justify-center gap-2 text-center">
        <span>💖 <strong>Limited Time:</strong> Get 50% OFF on All Premium Templates — Surprise Your Loved Ones Today!</span>
        <button 
          onClick={onExplore}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full transition-all flex items-center gap-1 border border-white/30 ml-2"
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
          Explore Premium
        </button>
      </div>
      <button 
        onClick={() => setVisible(false)} 
        className="p-1 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white"
        aria-label="Close Announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
