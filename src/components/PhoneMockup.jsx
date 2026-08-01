import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart, Play, Pause, Lock, Sparkles, Image as ImageIcon, Music, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PhoneMockup({ activeOccasion, customName = "Ananya" }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  const photos = [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=500&q=80'
  ];

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleEnvelopeClick = () => {
    setEnvelopeOpen(!envelopeOpen);
    triggerConfetti();
  };

  return (
    <div className="phone-mockup-wrapper flex justify-center items-center relative py-4">
      {/* Glow aura behind phone */}
      <div className="absolute w-72 h-96 bg-gradient-to-tr from-pink-600/30 via-purple-600/20 to-amber-500/20 rounded-full filter blur-3xl -z-10 animate-pulse-glow" />

      {/* Phone Frame */}
      <div className="phone-mockup-frame">
        
        {/* Notch */}
        <div className="phone-notch">
          <div className="phone-speaker" />
          <div className="phone-camera" />
        </div>

        {/* Screen Content */}
        <div className="w-full h-full bg-gradient-to-b from-[#180A2E] via-[#2A1045] to-[#140624] text-white pt-10 pb-6 px-4 flex flex-col justify-between overflow-y-auto relative select-none">
          
          {/* Animated floating background hearts */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <span className="absolute left-[15%] bottom-0 text-xl animate-[floatHearts_6s_infinite_linear]">💖</span>
            <span className="absolute left-[60%] bottom-0 text-2xl animate-[floatHearts_8s_2s_infinite_linear]">✨</span>
            <span className="absolute left-[85%] bottom-0 text-lg animate-[floatHearts_5s_1s_infinite_linear]">🎈</span>
          </div>

          {/* Sound Control Toggle */}
          <div className="flex justify-between items-center z-10">
            <span className="text-[10px] font-bold tracking-widest text-pink-400 uppercase bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
              {activeOccasion?.title || 'Anniversary'} Special
            </span>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 transition-all"
              title="Toggle Music"
            >
              {isPlaying ? <Volume2 className="w-4 h-4 text-pink-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>

          {/* Recipient Greeting Card */}
          <div className="mt-3 text-center z-10">
            <h3 className="text-xl font-extrabold font-['Outfit'] gradient-text leading-snug">
              Hey {customName}! 💖
            </h3>
            <p className="text-xs text-pink-200/90 font-medium mt-1 px-2 leading-relaxed">
              You make my world <span className="text-pink-400 font-bold italic font-['Dancing_Script'] text-base">beautiful</span> every single day.
            </p>
            <div className="inline-block mt-1 px-3 py-0.5 bg-pink-500/20 border border-pink-400/30 rounded-full text-[11px] font-bold text-pink-300">
              Happy {activeOccasion?.title || 'Anniversary'}! ✨
            </div>
          </div>

          {/* Stacked Photos Slider */}
          <div className="my-3 relative w-full h-44 rounded-2xl overflow-hidden border border-white/20 shadow-2xl group cursor-pointer z-10" onClick={() => setActivePhoto((activePhoto + 1) % photos.length)}>
            <img 
              src={photos[activePhoto]} 
              alt="Couples moment" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-3">
              <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>Our Favorite Memory ({activePhoto + 1}/{photos.length})</span>
              </div>
              
              {/* Play Audio Indicator */}
              <button className="w-8 h-8 rounded-full bg-pink-500/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg animate-pulse">
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Sealed Romantic Love Envelope */}
          <div 
            onClick={handleEnvelopeClick}
            className="my-1 relative w-full bg-gradient-to-r from-rose-900/40 to-pink-900/40 border border-pink-500/30 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:border-pink-400 transition-all z-10 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                💌
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  Secret Love Note
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </div>
                <div className="text-[10px] text-pink-200/70">
                  {envelopeOpen ? "Tap to seal letter" : "Tap to open surprise letter"}
                </div>
              </div>
            </div>

            <div className="w-7 h-7 rounded-full bg-rose-500/30 border border-rose-400/40 flex items-center justify-center text-xs">
              {envelopeOpen ? '✨' : '💖'}
            </div>
          </div>

          {/* Opened Letter Modal Preview inside phone */}
          {envelopeOpen && (
            <div className="mt-1 p-3 bg-pink-950/80 border border-pink-400/40 rounded-xl text-[11px] text-pink-100 italic leading-relaxed animate-fadeIn z-10">
              "From the day we met, every second with you has been pure magic. Here's to forever together!" 🌹
            </div>
          )}

          {/* Bottom Hint Indicator */}
          <div className="mt-2 text-center text-[10px] text-pink-300/70 flex items-center justify-center gap-1 animate-bounce z-10">
            <span>Scroll to experience magic 💫</span>
          </div>

        </div>

      </div>
    </div>
  );
}
