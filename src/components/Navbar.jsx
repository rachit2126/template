import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown, Lock, Sparkles, Menu, X, ExternalLink } from 'lucide-react';

export default function Navbar({ onOpenBuilder, onOpenTemplates, onOpenRecipientDemo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [templatesDropdown, setTemplatesDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 pb-2 transition-all duration-300">
      <header 
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0F071D]/90 backdrop-blur-2xl border border-pink-500/30 shadow-2xl shadow-pink-500/20 py-2.5 px-6' 
            : 'bg-[#140A28]/75 backdrop-blur-xl border border-white/20 shadow-xl py-3 px-6'
        }`}
      >
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 p-[2px] shadow-lg shadow-pink-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#130B27] rounded-[14px] flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-['Outfit'] flex items-center gap-1">
                Cutiepage
              </span>
              <span className="text-[9px] text-pink-300 font-semibold tracking-widest uppercase hidden sm:inline-block">
                Express. Surprise. Celebrate.
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-200">
            <a href="#hero" className="hover:text-pink-400 transition-colors text-white">Home</a>
            
            <div className="relative" onMouseEnter={() => setTemplatesDropdown(true)} onMouseLeave={() => setTemplatesDropdown(false)}>
              <button 
                onClick={onOpenTemplates}
                className="flex items-center gap-1 hover:text-pink-400 transition-colors py-2"
              >
                Templates <ChevronDown className={`w-3.5 h-3.5 transition-transform ${templatesDropdown ? 'rotate-180 text-pink-400' : ''}`} />
              </button>

              {templatesDropdown && (
                <div className="absolute top-full left-0 w-56 py-2 bg-[#160D2C] border border-white/20 rounded-2xl shadow-2xl backdrop-blur-2xl animate-fadeIn">
                  <a href="#occasions" onClick={onOpenTemplates} className="block px-4 py-2 text-xs font-semibold text-pink-400 hover:bg-pink-500/15">🎂 Birthday Surprises</a>
                  <a href="#occasions" onClick={onOpenTemplates} className="block px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-pink-500/15">💖 Love & Romance</a>
                  <a href="#occasions" onClick={onOpenTemplates} className="block px-4 py-2 text-xs font-semibold text-amber-400 hover:bg-pink-500/15">💍 Anniversary Special</a>
                  <a href="#occasions" onClick={onOpenTemplates} className="block px-4 py-2 text-xs font-semibold text-cyan-400 hover:bg-pink-500/15">👥 Best Friends Memories</a>
                  <a href="#occasions" onClick={onOpenTemplates} className="block px-4 py-2 text-xs font-semibold text-purple-400 hover:bg-pink-500/15">🎁 Secret Proposal Cards</a>
                </div>
              )}
            </div>

            <a href="#features" className="hover:text-pink-400 transition-colors">Features</a>
            <a href="#reviews" className="hover:text-pink-400 transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-pink-400 transition-colors">Contact</a>

            {/* Recipient Link Preview Badge */}
            <button 
              onClick={onOpenRecipientDemo} 
              className="flex items-center gap-1.5 text-xs font-bold text-pink-300 bg-pink-500/20 border border-pink-400/40 px-3 py-1.5 rounded-full hover:bg-pink-500/30 transition-all shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Demo Link</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={onOpenBuilder}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors px-2"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Login
            </button>

            <button 
              onClick={onOpenBuilder}
              className="btn-primary text-xs py-2.5 px-5 group shadow-lg shadow-pink-500/30"
            >
              <span>Make Yours</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={onOpenRecipientDemo}
              className="btn-secondary text-xs py-1 px-2.5 rounded-full"
            >
              Demo Link 🔗
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-1.5 text-slate-300 hover:text-white rounded-full bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/15 px-2 pb-2 flex flex-col gap-3 animate-fadeIn">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-white font-semibold text-xs">Home</a>
            <a href="#occasions" onClick={() => { setMobileMenuOpen(false); onOpenTemplates(); }} className="text-slate-300 text-xs">Templates</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 text-xs">Features</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 text-xs">Reviews</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 text-xs">Contact</a>
            <button onClick={() => { setMobileMenuOpen(false); onOpenRecipientDemo(); }} className="text-pink-300 text-left font-bold text-xs">
              🔗 View Recipient Demo Link
            </button>
          </div>
        )}

      </header>
    </div>
  );
}
