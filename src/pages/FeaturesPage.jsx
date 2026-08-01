import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Music, Image as ImageIcon, Gamepad2, Lock, BarChart3, Share2, Wand2, Check, X, ShieldCheck } from 'lucide-react';

export default function FeaturesPage() {
  const navigate = useNavigate();

  const featureCategories = [
    {
      icon: <Wand2 className="w-6 h-6 text-pink-400" />,
      title: 'AI Studio Copilot',
      description: 'Generates romantic poems, customized birthday wishes, inside joke quizzes, and photo storyboards automatically.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: 'Interactive Physics Animations',
      description: 'Popping balloons, falling rose petals, fireworks display, floating hearts, and unsealing envelope animations.'
    },
    {
      icon: <Music className="w-6 h-6 text-purple-400" />,
      title: 'Background Music & Voice Notes',
      description: 'Autoplay romantic acoustic tracks, voice messages, or custom audio files on page open.'
    },
    {
      icon: <ImageIcon className="w-6 h-6 text-rose-400" />,
      title: 'HD Polaroid & Memory Timelines',
      description: 'High-definition photo stacks, polaroid sliders, timeline history, and video memory loops.'
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-cyan-400" />,
      title: 'Games & Scratch Cards',
      description: 'Interactive scratch-to-reveal reward coupons, quiz games, spin wheels, and gift box unlocks.'
    },
    {
      icon: <Lock className="w-6 h-6 text-yellow-400" />,
      title: 'Password PIN Protection',
      description: '100% private security lock requiring a secret 4-digit PIN to unseal your precious memories.'
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      title: 'Real-time View Analytics',
      description: 'Track when your recipient opens the link, how many times they re-visited, and sound playback stats.'
    },
    {
      icon: <Share2 className="w-6 h-6 text-blue-400" />,
      title: 'Instant QR & WhatsApp Links',
      description: 'Private URL and high-res printable QR code ready to print on physical cards or share on WhatsApp.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Digital Gifting Features
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-['Outfit']">
          Designed for Pure <span className="gradient-text">Emotion</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Discover all the interactive components, security options, and AI capabilities built into Cutiepage.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureCategories.map((f, i) => (
          <div key={i} className="glass-panel p-6 space-y-4 hover:border-pink-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">{f.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>

      {/* Comparison Matrix Table */}
      <div className="space-y-6 pt-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Why Cutiepage Beats Traditional Gifts
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">See how we compare against traditional paper cards and physical gifts.</p>
        </div>

        <div className="glass-panel overflow-x-auto rounded-3xl p-6">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-4 px-4 font-bold">Feature</th>
                <th className="py-4 px-4 font-bold text-pink-400 text-base">Cutiepage Digital</th>
                <th className="py-4 px-4 font-bold">Paper Greeting Cards</th>
                <th className="py-4 px-4 font-bold">Physical Gifts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              <tr>
                <td className="py-4 px-4 font-semibold">Delivery Time</td>
                <td className="py-4 px-4 text-pink-300 font-bold">⚡ Instant (30 sec)</td>
                <td className="py-4 px-4 text-slate-400">3-5 Days Shipping</td>
                <td className="py-4 px-4 text-slate-400">2-7 Days Shipping</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold">Autoplay Music & Voice</td>
                <td className="py-4 px-4 text-emerald-400"><Check className="w-5 h-5 inline" /> Included</td>
                <td className="py-4 px-4 text-rose-400"><X className="w-5 h-5 inline" /> No</td>
                <td className="py-4 px-4 text-rose-400"><X className="w-5 h-5 inline" /> No</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold">Interactive Scratch Cards & Games</td>
                <td className="py-4 px-4 text-emerald-400"><Check className="w-5 h-5 inline" /> Included</td>
                <td className="py-4 px-4 text-rose-400"><X className="w-5 h-5 inline" /> No</td>
                <td className="py-4 px-4 text-rose-400"><X className="w-5 h-5 inline" /> No</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold">Password PIN Lock Security</td>
                <td className="py-4 px-4 text-emerald-400"><Check className="w-5 h-5 inline" /> 100% Private</td>
                <td className="py-4 px-4 text-rose-400"><X className="w-5 h-5 inline" /> Public</td>
                <td className="py-4 px-4 text-rose-400"><X className="w-5 h-5 inline" /> N/A</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold">Lifetime Access Forever</td>
                <td className="py-4 px-4 text-pink-300 font-bold">Yes (Pay Once)</td>
                <td className="py-4 px-4 text-slate-400">Gets Lost/Damaged</td>
                <td className="py-4 px-4 text-slate-400">Wears Out</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <button 
          onClick={() => navigate('/editor')} 
          className="btn-primary py-4 px-8 text-base shadow-2xl shadow-pink-500/40"
        >
          Try All Features in Studio ✨
        </button>
      </div>

    </div>
  );
}
