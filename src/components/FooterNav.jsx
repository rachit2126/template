import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Send } from 'lucide-react';

export default function FooterNav() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 relative z-10 text-slate-600 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-[2px] shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                </div>
              </div>
              <span className="text-2xl font-extrabold text-slate-900 font-['Outfit']">Cutiepage</span>
            </Link>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              India's #1 surprise gifting platform. Express feelings, cherish memories, and celebrate love with personalized interactive web pages.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link to="/editor" className="btn-primary text-xs py-2 px-4">
                Make Yours ✨
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="text-left">
            <h4 className="text-slate-900 font-bold text-sm mb-4 font-['Outfit']">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/templates" className="hover:text-pink-600 transition-colors">Templates Gallery</Link></li>
              <li><Link to="/features" className="hover:text-pink-600 transition-colors">Features Overview</Link></li>
              <li><Link to="/pricing" className="hover:text-pink-600 transition-colors">Pricing Plans</Link></li>
              <li><Link to="/gallery" className="hover:text-pink-600 transition-colors">Community Gallery</Link></li>
              <li><Link to="/editor" className="hover:text-pink-600 transition-colors">Creative Studio</Link></li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="text-left">
            <h4 className="text-slate-900 font-bold text-sm mb-4 font-['Outfit']">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/reviews" className="hover:text-pink-600 transition-colors">Customer Reviews</Link></li>
              <li><Link to="/blog" className="hover:text-pink-600 transition-colors">Blog & Tutorials</Link></li>
              <li><Link to="/docs" className="hover:text-pink-600 transition-colors">Documentation</Link></li>
              <li><Link to="/help" className="hover:text-pink-600 transition-colors">Help Center & FAQ</Link></li>
              <li><Link to="/about" className="hover:text-pink-600 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Account & Legal */}
          <div className="text-left">
            <h4 className="text-slate-900 font-bold text-sm mb-3 font-['Outfit']">Account</h4>
            <ul className="space-y-2.5 text-xs mb-4">
              <li><Link to="/dashboard" className="hover:text-pink-600 transition-colors">User Dashboard</Link></li>
              <li><Link to="/login" className="hover:text-pink-600 transition-colors">Login / Sign In</Link></li>
              <li><Link to="/signup" className="hover:text-pink-600 transition-colors">Create Account</Link></li>
            </ul>

            <h4 className="text-slate-900 font-bold text-xs mb-2 font-['Outfit']">Newsletter</h4>
            <div className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-500"
              />
              <button className="w-full btn-secondary text-xs py-1.5 justify-center">
                <Send className="w-3.5 h-3.5 text-pink-600" /> Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Cutiepage Inc. All rights reserved. Express. Surprise. Celebrate.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
            <span>for lovers worldwide.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
