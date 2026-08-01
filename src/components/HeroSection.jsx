import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Grid, ShieldCheck, Zap, Heart, Star, MessageCircle } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import FloatingBadges from './FloatingBadges';

export default function HeroSection({ activeOccasion }) {
  const navigate = useNavigate();
  const [recipientName, setRecipientName] = useState('Roshni');

  const WHATSAPP_NUMBER = '919119055155';

  const customerAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
  ];

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(`Hi Cutiepage! I want to order a digital surprise page for ${recipientName}. Please share template options & pricing! 💖`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section id="hero" className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden min-h-[92vh] flex items-center">
      
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/hero_bg.jpg" 
          alt="Cutiepage Romantic Sunset Background" 
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.88] contrast-[1.08] saturate-[1.1]"
        />
        
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#090514] via-[#090514]/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#090514] via-[#090514]/85 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#090514]/90 via-[#090514]/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold mb-6 shadow-xl shadow-black/40">
              <span className="text-amber-300">⚡</span>
              <span>India's #1 Surprise Gifting Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-['Outfit'] tracking-tight leading-[1.15] mb-6 drop-shadow-lg">
              Turn Moments into{' '}
              <span className="relative inline-block">
                <span className="gradient-text font-black">Magical Memories</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-pink-500 overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q25,20 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl mb-8 drop-shadow-md">
              Create beautiful, interactive & personalized pages in 30 seconds. Add photos, music, wishes, balloons, games and more!
            </p>

            {/* Small Bullet Feature Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-white mb-8">
              <div className="flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full shadow-xl transition-all">
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Ready in 30 sec</span>
              </div>
              <div className="flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full shadow-xl transition-all">
                <ShieldCheck className="w-4 h-4 text-pink-400" />
                <span>Private & Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full shadow-xl transition-all">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span>Pay Once, Use Forever</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <button 
                onClick={handleWhatsAppContact}
                className="btn-primary text-base py-3.5 px-7 w-full sm:w-auto justify-center group shadow-2xl shadow-emerald-500/40 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 text-white font-bold"
              >
                <MessageCircle className="w-5 h-5 fill-white text-white" />
                <span>Order on WhatsApp</span>
              </button>

              <button 
                onClick={() => navigate('/templates')}
                className="btn-secondary text-base py-3.5 px-6 w-full sm:w-auto justify-center bg-black/50 hover:bg-black/70 backdrop-blur-xl border-white/25 text-white shadow-xl"
              >
                <Grid className="w-5 h-5 text-pink-400" />
                <span>Explore Templates</span>
              </button>
            </div>

            {/* Live Name Input Pill Bar */}
            <div className="w-full max-w-md bg-black/50 backdrop-blur-xl border border-white/20 rounded-full p-2.5 flex items-center gap-3 mb-8 shadow-2xl">
              <span className="text-xs text-slate-200 font-semibold pl-3 whitespace-nowrap">Try live name:</span>
              <input 
                type="text" 
                value={recipientName} 
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter Recipient Name (e.g. Roshni)"
                className="bg-black/60 border border-white/20 rounded-full px-4 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-400 w-full"
              />
              <span className="text-xs text-pink-400 font-bold pr-2 whitespace-nowrap">Live ⚡</span>
            </div>

            {/* Social Proof Row */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/20 w-full">
              <div className="flex -space-x-3">
                {customerAvatars.map((src, i) => (
                  <img key={i} src={src} alt="Customer" className="w-9 h-9 rounded-full border-2 border-[#090514] object-cover" />
                ))}
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1">4.9/5</span>
                </div>
                <span className="text-xs text-slate-200 font-medium drop-shadow">from 2,000+ reviews</span>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
            <PhoneMockup activeOccasion={activeOccasion} customName={recipientName} />
            <FloatingBadges onSelectFeature={() => navigate('/templates')} />
          </div>

        </div>
      </div>
    </section>
  );
}
