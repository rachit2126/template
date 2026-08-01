import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ChevronDown, Lock, Menu, X, MessageCircle } from 'lucide-react';

export default function FloatingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [templatesDropdown, setTemplatesDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const WHATSAPP_NUMBER = '919119055155';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setTemplatesDropdown(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates', hasDropdown: true },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Blog', path: '/blog' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent("Hi Cutiepage! I would like to order a digital surprise template. Please share template options and payment details! 💖");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 pb-2 transition-all duration-300 font-['Plus_Jakarta_Sans']">
      <header 
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 py-2.5 px-6' 
            : 'bg-white/85 backdrop-blur-xl border border-slate-200/70 shadow-lg py-3 px-6'
        }`}
      >
        <div className="flex items-center justify-between h-12">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 p-[2px] shadow-md shadow-pink-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 font-['Outfit'] flex items-center gap-1">
                Cutiepage
              </span>
              <span className="text-[8px] text-pink-600 font-semibold tracking-widest uppercase hidden sm:inline-block">
                Express. Surprise. Celebrate.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold">
            {navLinks.map((link) => {
              const active = isActive(link.path);

              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.name} 
                    className="relative" 
                    onMouseEnter={() => setTemplatesDropdown(true)} 
                    onMouseLeave={() => setTemplatesDropdown(false)}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 py-2 transition-colors ${
                        active ? 'text-pink-600 font-bold' : 'text-slate-700 hover:text-pink-600'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${templatesDropdown ? 'rotate-180 text-pink-600' : ''}`} />
                    </Link>

                    {templatesDropdown && (
                      <div className="absolute top-full left-0 w-56 py-2 bg-white border border-slate-200 rounded-2xl shadow-xl backdrop-blur-2xl animate-fadeIn text-left">
                        <Link to="/templates?category=birthday" className="block px-4 py-2 text-xs font-semibold text-slate-800 hover:text-pink-600 hover:bg-pink-50">🎂 Birthday Surprises</Link>
                        <Link to="/templates?category=love" className="block px-4 py-2 text-xs font-semibold text-slate-800 hover:text-rose-600 hover:bg-pink-50">💖 Love & Romance</Link>
                        <Link to="/templates?category=anniversary" className="block px-4 py-2 text-xs font-semibold text-slate-800 hover:text-amber-600 hover:bg-amber-50">💍 Anniversary Special</Link>
                        <Link to="/templates?category=friendship" className="block px-4 py-2 text-xs font-semibold text-slate-800 hover:text-purple-600 hover:bg-purple-50">👥 Best Friends Memories</Link>
                        <Link to="/templates?category=proposal" className="block px-4 py-2 text-xs font-semibold text-slate-800 hover:text-indigo-600 hover:bg-indigo-50">🎁 Secret Proposal Cards</Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors relative py-1 ${
                    active ? 'text-pink-600 font-bold' : 'text-slate-700 hover:text-pink-600'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link 
              to="/login"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors px-2"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Login
            </Link>

            <button 
              onClick={handleWhatsAppOrder}
              className="btn-primary text-xs py-2 px-4 group shadow-md shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 text-white font-bold flex items-center gap-1.5 rounded-full"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
              <span>Contact on WhatsApp</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={handleWhatsAppOrder}
              className="bg-emerald-600 text-white text-[11px] font-bold py-1.5 px-3 rounded-full flex items-center gap-1 shadow-sm"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-1.5 text-slate-700 hover:text-slate-900 rounded-full bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 px-2 pb-3 flex flex-col gap-2.5 animate-fadeIn text-left">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={`text-xs font-semibold py-1.5 px-3 rounded-lg ${
                  isActive(link.path) ? 'bg-pink-50 text-pink-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <Link to="/login" className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Login
              </Link>
              <button 
                onClick={handleWhatsAppOrder}
                className="text-xs font-bold text-emerald-600 flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Order on WhatsApp
              </button>
            </div>
          </div>
        )}

      </header>
    </div>
  );
}
