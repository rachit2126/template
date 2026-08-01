import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, Sparkles, ExternalLink } from 'lucide-react';

export default function GalleryPage() {
  const navigate = useNavigate();

  const communityPages = [
    {
      id: 1,
      title: 'Ananya & Rahul — 5 Years of Magic',
      creator: 'Rahul S.',
      views: '1,420',
      likes: '380',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80',
      occasion: 'Anniversary'
    },
    {
      id: 2,
      title: 'Happy 24th Birthday Priya! 🎂',
      creator: 'Aman K.',
      views: '890',
      likes: '210',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
      occasion: 'Birthday'
    },
    {
      id: 3,
      title: 'Will You Marry Me Sneha? 💍',
      creator: 'Vikram R.',
      views: '3,100',
      likes: '950',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
      occasion: 'Proposal'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-bold uppercase">
          <Compass className="w-3.5 h-3.5" /> Community Creations Showcase
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-['Outfit']">
          Community <span className="gradient-text">Gallery</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Explore real public surprise pages created by Cutiepage creators worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {communityPages.map((p) => (
          <div key={p.id} className="glass-card rounded-3xl overflow-hidden group">
            <div className="relative h-56 overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-pink-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                {p.occasion}
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-base font-bold text-white font-['Outfit']">{p.title}</h3>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>By {p.creator}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-pink-400" /> {p.views}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> {p.likes}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/publish/ananya-anniversary-demo')}
                className="btn-secondary w-full py-2 text-xs justify-center flex items-center gap-1 mt-2"
              >
                <span>View Live Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
