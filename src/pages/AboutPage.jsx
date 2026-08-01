import React from 'react';
import { Heart, Sparkles, ShieldCheck, Users, Rocket } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-bold uppercase">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" /> Our Story & Mission
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-['Outfit']">
          We Believe Love Deserves <span className="gradient-text">Magic</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Cutiepage was created to bridge distance and transform simple greetings into interactive memory experiences.
        </p>
      </div>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-2xl">
            🚀
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">Instant Joy</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Eliminating shipping delays with instant private URLs and printable QR codes that deliver emotion in seconds.
          </p>
        </div>

        <div className="glass-panel p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl">
            🎨
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">High Aesthetics</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Combining glassmorphism, 3D physics balloon animations, custom sound playback, and secret scratch cards.
          </p>
        </div>

        <div className="glass-panel p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl">
            🔒
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">100% Privacy</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Optional password PIN locks ensure that secret vows, inside jokes, and private photos stay strictly confidential.
          </p>
        </div>
      </div>

    </div>
  );
}
