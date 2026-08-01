import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Lock, Sparkles, ArrowLeft, Gift, Share2, Play, Pause, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RecipientSurprisePage({ onBack, data }) {
  const recipientName = data?.recipientName || 'Ananya';
  const senderName = data?.senderName || 'Rahul';
  const occasionTitle = data?.occasionTitle || 'Anniversary';
  const message = data?.message || 'From the moment you entered my life, every single day has felt like a fairytale. You are my best friend, my soulmate, and my forever love. Happy Anniversary! 💖';

  const [isLocked, setIsLocked] = useState(data?.enablePassword || false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [letterOpened, setLetterOpened] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      caption: 'Our first trip together in Paris 🗼'
    },
    {
      url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      caption: 'Late night walks and endless conversations 🌙'
    },
    {
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      caption: 'Forever smiling by your side ✨'
    }
  ];

  useEffect(() => {
    // Launch celebratory confetti when page loads
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.4 }
    });
  }, []);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pinInput === (data?.password || '1234') || pinInput === '1234') {
      setIsLocked(false);
      confetti({ particleCount: 80, spread: 90 });
    } else {
      setPinError(true);
    }
  };

  const handleLetterClick = () => {
    setLetterOpened(!letterOpened);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
  };

  // PASSWORD LOCK SCREEN
  if (isLocked) {
    return (
      <div className="min-h-screen bg-[#0E061B] text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
        
        <div className="glass-panel p-8 max-w-md w-full text-center relative z-10 space-y-6">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center mx-auto text-pink-400">
            <Lock className="w-8 h-8 animate-bounce" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold font-['Outfit'] gradient-text">
              Secret Surprise Protected 🔒
            </h2>
            <p className="text-xs text-pink-200/80 mt-1">
              Enter the 4-digit PIN sent by <strong className="text-white">{senderName}</strong> to unlock your gift.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input 
              type="password" 
              maxLength="4"
              value={pinInput}
              onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
              placeholder="Enter PIN (e.g. 1234)"
              className="w-full bg-black/50 border border-pink-500/40 rounded-2xl px-4 py-3 text-center text-lg tracking-[0.5em] font-mono text-white focus:outline-none focus:border-pink-400"
            />
            {pinError && <p className="text-xs text-rose-400">Incorrect PIN code! Try 1234.</p>}

            <button type="submit" className="btn-primary w-full justify-center py-3">
              Unlock Surprise ✨
            </button>
          </form>

          <button onClick={onBack} className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto pt-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Site
          </button>
        </div>
      </div>
    );
  }

  // LIVE SURPRISE PAGE FOR RECIPIENT
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F071D] via-[#1D0A35] to-[#0A0314] text-white relative overflow-x-hidden font-['Plus_Jakarta_Sans'] pb-20">
      
      {/* Floating Animated Balloons & Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <span className="absolute left-[10%] bottom-0 text-3xl animate-[floatHearts_8s_infinite_linear]">🎈</span>
        <span className="absolute left-[30%] bottom-0 text-4xl animate-[floatHearts_10s_2s_infinite_linear]">💖</span>
        <span className="absolute left-[70%] bottom-0 text-2xl animate-[floatHearts_7s_1s_infinite_linear]">✨</span>
        <span className="absolute left-[85%] bottom-0 text-3xl animate-[floatHearts_9s_3s_infinite_linear]">🌹</span>
      </div>

      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-40 bg-[#0E061B]/80 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Surprise Page
        </button>

        <div className="flex items-center gap-3">
          <div className="text-xs font-semibold text-pink-300 hidden sm:flex items-center gap-1">
            <Music className="w-3.5 h-3.5 text-pink-400" /> Playing: {data?.musicTrack || 'Romantic Piano'}
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300 hover:text-white"
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Recipient Hero Container */}
      <div className="max-w-3xl mx-auto px-4 pt-10 text-center relative z-10">
        
        {/* Occasion Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          Special {occasionTitle} Surprise
        </div>

        {/* Recipient Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold font-['Outfit'] gradient-text mb-4 leading-tight">
          Happy {occasionTitle}, {recipientName}! 💖
        </h1>

        <p className="text-sm sm:text-base text-pink-200/90 max-w-xl mx-auto font-normal leading-relaxed mb-8">
          Crafted with love by <strong className="text-white font-semibold">{senderName}</strong> especially for you.
        </p>

        {/* Photo Memory Slider */}
        <div className="relative glass-panel p-4 rounded-3xl mb-12 shadow-2xl">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden group">
            <img 
              src={photos[selectedPhoto].url} 
              alt="Memory" 
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-6">
              <div className="text-left">
                <span className="text-xs text-pink-400 font-bold uppercase">Memory #{selectedPhoto + 1}</span>
                <h4 className="text-sm sm:text-lg font-bold text-white mt-0.5">{photos[selectedPhoto].caption}</h4>
              </div>

              {/* Photo Thumbnails */}
              <div className="flex gap-2">
                {photos.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedPhoto(i)}
                    className={`w-3 h-3 rounded-full transition-all ${selectedPhoto === i ? 'bg-pink-500 w-6' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Love Envelope */}
        <div className="mb-12">
          <h3 className="text-xl font-extrabold text-white font-['Outfit'] mb-4 flex items-center justify-center gap-2">
            💌 Secret Letter from {senderName}
          </h3>

          <div 
            onClick={handleLetterClick}
            className="glass-panel-glow p-6 sm:p-8 cursor-pointer hover:border-pink-400 transition-all text-left group relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">✉️</span>
                <div>
                  <span className="text-xs text-pink-300 font-bold">Personal Note</span>
                  <p className="text-xs text-slate-400">{letterOpened ? 'Click to close letter' : 'Click to unseal love letter ✨'}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-pink-400 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-400/30">
                {letterOpened ? 'Opened' : 'Tap to Open'}
              </span>
            </div>

            {letterOpened ? (
              <div className="pt-4 border-t border-pink-500/30 animate-fadeIn space-y-3">
                <p className="text-base sm:text-lg text-pink-100 font-['Dancing_Script'] leading-relaxed italic">
                  "{message}"
                </p>
                <div className="text-right text-xs text-pink-400 font-bold">
                  With all my love, <br />
                  <span className="text-base text-white font-['Outfit']">{senderName} ❤️</span>
                </div>
              </div>
            ) : (
              <div className="h-16 flex items-center justify-center border-2 border-dashed border-pink-500/30 rounded-xl bg-pink-500/5 text-pink-300 text-xs font-medium">
                💖 Tap anywhere on this card to read secret letter
              </div>
            )}
          </div>
        </div>

        {/* Interactive Scratch Card Reward */}
        <div className="glass-panel p-6 sm:p-8 text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
            <Gift className="w-4 h-4" /> Surprise Gift Box
          </div>

          <h3 className="text-xl font-bold text-white font-['Outfit']">Scratch for Your Secret Reward</h3>

          {!scratched ? (
            <div 
              onClick={() => { setScratched(true); confetti({ particleCount: 90, spread: 100 }); }}
              className="w-full h-32 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 flex flex-col items-center justify-center cursor-pointer shadow-xl border-2 border-amber-300 animate-pulse group"
            >
              <span className="text-3xl mb-1 group-hover:scale-125 transition-transform">🎁</span>
              <span className="text-sm font-extrabold text-white tracking-wider uppercase">Tap / Scratch to Reveal Gift</span>
            </div>
          ) : (
            <div className="w-full h-32 rounded-2xl bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border-2 border-emerald-400 p-4 flex flex-col items-center justify-center text-emerald-200 animate-fadeIn">
              <Award className="w-8 h-8 text-emerald-400 mb-1" />
              <h4 className="text-lg font-bold text-white">Romantic Dinner Date & Weekend Getaway! 🥂✨</h4>
              <p className="text-xs text-emerald-300 mt-1">Claimed with love by {recipientName}</p>
            </div>
          )}
        </div>

        {/* Footer info inside recipient surprise */}
        <div className="pt-6 border-t border-white/10 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Created on Cutiepage Surprise Platform</span>
          <button onClick={onBack} className="text-pink-400 hover:text-pink-300 font-semibold">
            Create Your Own Surprise Page →
          </button>
        </div>

      </div>
    </div>
  );
}
