import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Heart, Play, Pause, Lock, Sparkles, Image as ImageIcon, Music, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PhoneMockup({ activeOccasion, customName = "Roshni" }) {
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
              className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white"
            >
              {isPlaying ? <Volume2 className="w-3.5 h-3.5 text-pink-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>

          {/* Main Hero Header Inside Phone */}
          <div className="text-center my-4 space-y-1.5 z-10">
            <h3 className="text-xl font-extrabold text-white font-['Outfit'] tracking-tight flex items-center justify-center gap-1.5">
              <span>Hey {customName || 'Roshni'}!</span>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </h3>
            <p className="text-[11px] text-pink-200/90 leading-tight">
              {activeOccasion?.tagline || 'You make my world beautiful every single day.'}
            </p>
            <div className="pt-1">
              <span className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-full shadow-md">
                Happy Love! ✨
              </span>
            </div>
          </div>

          {/* Photo Gallery Component */}
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 h-44 shadow-lg group z-10 my-2">
            <img 
              src={photos[activePhoto]} 
              alt="Memory" 
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2.5 text-[10px]">
              <span className="text-pink-200 font-semibold flex items-center gap-1">
                <ImageIcon className="w-3 h-3 text-pink-400" />
                Our Favorite Memory ({activePhoto + 1}/3)
              </span>
              <button 
                onClick={() => setActivePhoto((prev) => (prev + 1) % photos.length)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-1 rounded-full"
              >
                <Play className="w-3 h-3 text-white fill-white" />
              </button>
            </div>
          </div>

          {/* Interactive Unseal Envelope */}
          <div 
            onClick={handleEnvelopeClick}
            className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-pink-500/30 rounded-2xl p-3.5 text-left cursor-pointer hover:border-pink-500/60 transition-all shadow-md z-10 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Secret Love Note 🪄</div>
                  <div className="text-[9px] text-pink-300">Tap to open surprise letter</div>
                </div>
              </div>
              <span className="text-xs animate-bounce">💖</span>
            </div>

            {envelopeOpen && (
              <div className="mt-3 pt-3 border-t border-pink-500/20 text-[10px] text-pink-100 leading-relaxed font-serif animate-fadeIn">
                "Dearest {customName || 'Roshni'}, every moment spent with you is like a beautiful dream come true. Thank you for filling my life with endless smiles..."
              </div>
            )}
          </div>

          {/* Bottom Footer Note inside Phone */}
          <div className="text-center pt-2 z-10">
            <span className="text-[9px] text-pink-300/70 tracking-wider uppercase font-medium">
              Scroll to experience magic 💫
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
