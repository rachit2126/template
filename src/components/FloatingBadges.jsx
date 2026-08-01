import React from 'react';

export default function FloatingBadges({ onSelectFeature }) {
  const badges = [
    {
      id: 'music',
      icon: '🎵',
      title: 'Auto Music',
      subtitle: 'Romantic Tracks',
      position: 'top-10 -left-6 sm:-left-20 lg:-left-28',
      animation: 'animate-float'
    },
    {
      id: 'balloons',
      icon: '🎈',
      title: 'Balloons',
      subtitle: 'Flying in Sky',
      position: 'top-44 -left-8 sm:-left-24 lg:-left-32',
      animation: 'animate-float-delayed'
    },
    {
      id: 'games',
      icon: '🎮',
      title: 'Games',
      subtitle: 'Fun & Interactive',
      position: 'bottom-28 -left-4 sm:-left-16 lg:-left-24',
      animation: 'animate-float'
    },
    {
      id: 'password',
      icon: '🔒',
      title: 'Password',
      subtitle: 'Protect Your Page',
      position: 'top-16 -right-6 sm:-right-20 lg:-right-24',
      animation: 'animate-float-delayed'
    },
    {
      id: 'gallery',
      icon: '🖼️',
      title: 'Gallery',
      subtitle: 'Beautiful Memories',
      position: 'top-48 -right-8 sm:-right-24 lg:-right-28',
      animation: 'animate-float'
    },
    {
      id: 'shareable',
      icon: '🔗',
      title: 'Shareable',
      subtitle: 'Link & QR Code',
      position: 'bottom-32 -right-4 sm:-right-16 lg:-right-20',
      animation: 'animate-float-delayed'
    }
  ];

  return (
    <>
      {badges.map((b) => (
        <div
          key={b.id}
          onClick={() => onSelectFeature && onSelectFeature(b.id)}
          className={`floating-badge ${b.position} ${b.animation} cursor-pointer hidden md:flex items-center gap-2.5`}
        >
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-lg">
            {b.icon}
          </div>
          <div className="text-left leading-tight">
            <div className="text-xs font-bold text-white flex items-center gap-1">
              {b.title}
            </div>
            <div className="text-[10px] text-pink-200/70 font-medium">
              {b.subtitle}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
