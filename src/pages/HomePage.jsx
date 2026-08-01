import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import OccasionsSection from '../components/OccasionsSection';
import ProductSlider from '../components/ProductSlider';
import { occasions } from '../data/occasions';
import { Sparkles, Heart, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [activeOccasion, setActiveOccasion] = useState(occasions[1]);

  return (
    <div className="space-y-12 pb-16 font-['Plus_Jakarta_Sans']">
      
      {/* 1. Hero Section */}
      <HeroSection 
        activeOccasion={activeOccasion}
        onOpenBuilder={() => navigate('/templates')}
        onOpenTemplates={() => navigate('/templates')}
      />

      {/* 2. Trust Bar (Stats Counter) */}
      <StatsSection />

      {/* 3. Live Demo Preview Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-3xl">
              💌
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase mb-1">
                <Sparkles className="w-3 h-3 text-amber-300" /> Live Demo
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                Experience a Live Recipient Surprise Page
              </h3>
              <p className="text-xs sm:text-sm text-pink-100 mt-1 max-w-xl">
                See exactly what your loved one experiences when they unseal their private link with music, password lock, and floating balloons.
              </p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/publish/ananya-anniversary-demo')}
            className="btn-secondary text-xs sm:text-sm py-3.5 px-6 whitespace-nowrap bg-white text-slate-900 border-none hover:bg-slate-100 shadow-lg flex items-center gap-2 font-bold"
          >
            <span>Open Demo Link</span>
            <ExternalLink className="w-4 h-4 text-pink-600" />
          </button>
        </div>
      </div>

      {/* 4. Home Page Product Showcase Slider */}
      <ProductSlider />

      {/* 5. Popular Occasions */}
      <OccasionsSection 
        activeOccasion={activeOccasion}
        onSelectOccasion={(occ) => setActiveOccasion(occ)}
        onOpenTemplates={() => navigate('/templates')}
      />

      {/* 6. Conversion CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="glass-panel-glow p-8 sm:p-14 text-center relative overflow-hidden bg-white border border-slate-200 rounded-3xl">
          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-xs font-bold uppercase">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> Pay Once, Use Forever
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit']">
              Ready to Make Someone Smile Today?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Join 32,900+ creators crafting unforgettable digital surprises in less than 30 seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button 
                onClick={() => navigate('/templates')}
                className="btn-primary py-4 px-8 text-base shadow-xl shadow-pink-500/30"
              >
                Explore Templates Now ✨
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
