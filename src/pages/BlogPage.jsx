import React from 'react';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const articles = [
    {
      id: 1,
      title: '10 Creative Ways to Surprise Your Partner Long-Distance',
      category: 'Gifting Guide',
      date: 'Aug 1, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Discover how digital memory timelines and voice notes bring lovers together regardless of physical distance.'
    },
    {
      id: 2,
      title: 'How to Build an Interactive Anniversary Page in Under 30 Seconds',
      category: 'Tutorial',
      date: 'Jul 28, 2026',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Step-by-step guide to customizing songs, password locks, and floating balloon animations.'
    },
    {
      id: 3,
      title: 'The Secret Science of Romantic Music and Emotional Connection',
      category: 'Insights',
      date: 'Jul 20, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Why background acoustic piano tracks trigger memories and happy tears.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left font-['Plus_Jakarta_Sans']">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Articles & Gifting Tutorials
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 font-['Outfit']">
          The Celebration <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Tips, guides, and inspiration for making every anniversary, birthday, and proposal unforgettable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((a) => (
          <div key={a.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
            <div className="relative h-48 overflow-hidden">
              <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[10px] text-pink-600 font-bold mb-2">
                  <span>{a.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-500"><Clock className="w-3 h-3" /> {a.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-['Outfit'] group-hover:text-pink-600 transition-colors">
                  {a.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">{a.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-600">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
