import React from 'react';
import { Heart, Send, Sparkles } from 'lucide-react';

export default function Footer({ onOpenBuilder }) {
  return (
    <footer className="bg-[#06030E] border-t border-white/10 pt-16 pb-12 relative z-10 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-[2px] shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-[#130B27] rounded-[14px] flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                </div>
              </div>
              <span className="text-2xl font-extrabold text-white font-['Outfit']">Cutiepage</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India's #1 surprise gifting platform. Express feelings, cherish memories, and celebrate love with personalized interactive web pages.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button onClick={onOpenBuilder} className="btn-primary text-xs py-2 px-4">
                Make Yours ✨
              </button>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-['Outfit']">Occasions</h4>
            <ul className="space-y-2.5">
              <li><a href="#occasions" className="hover:text-pink-400 transition-colors">Birthday Surprises</a></li>
              <li><a href="#occasions" className="hover:text-pink-400 transition-colors">Love & Romance</a></li>
              <li><a href="#occasions" className="hover:text-pink-400 transition-colors">Anniversary Gifts</a></li>
              <li><a href="#occasions" className="hover:text-pink-400 transition-colors">Friendship Memory Lane</a></li>
              <li><a href="#occasions" className="hover:text-pink-400 transition-colors">Secret Proposals</a></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-['Outfit']">Platform</h4>
            <ul className="space-y-2.5">
              <li><a href="#features" className="hover:text-pink-400 transition-colors">All Features</a></li>
              <li><a href="#reviews" className="hover:text-pink-400 transition-colors">Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-pink-400 transition-colors">FAQ & Support</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-white font-bold text-sm mb-3 font-['Outfit']">Stay Updated</h4>
            <p className="text-xs text-slate-400 mb-3">Get exclusive templates & discount offers direct to your inbox.</p>
            <div className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
              />
              <button className="w-full btn-secondary text-xs py-2 justify-center">
                <Send className="w-3.5 h-3.5 text-pink-400" /> Subscribe
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
