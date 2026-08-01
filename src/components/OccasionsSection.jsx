import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { occasions } from '../data/occasions';

export default function OccasionsSection({ activeOccasion, onSelectOccasion, onOpenTemplates }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="occasions" className="py-12 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
              Popular Occasions <span className="text-pink-500">💖</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Choose an occasion to customize your digital surprise page instantly
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenTemplates}
              className="hidden sm:flex items-center gap-1 text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 transition-colors mr-2"
            >
              <span>View All Templates</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Carousel Arrow Controls */}
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-all shadow-md shadow-pink-500/20"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Occasions Carousel */}
        <div 
          ref={scrollRef} 
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {occasions.map((occ) => {
            const isSelected = activeOccasion?.id === occ.id;

            return (
              <div 
                key={occ.id}
                onClick={() => onSelectOccasion(occ)}
                className={`occasion-card flex-shrink-0 w-44 sm:w-52 snap-start group ${
                  isSelected ? 'border-2 border-pink-500 shadow-xl shadow-pink-500/30 scale-[1.03]' : ''
                }`}
              >
                <img src={occ.image} alt={occ.title} />

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-base z-10">
                  {occ.icon}
                </div>

                {isSelected && (
                  <div className="absolute top-3 left-3 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider z-10 flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" /> Active
                  </div>
                )}

                <div className="occasion-card-overlay">
                  <span className="text-xs text-pink-300 font-semibold mb-0.5">
                    {occ.templatesCount} Templates
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                    {occ.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
