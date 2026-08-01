import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function ReviewsPage() {
  return (
    <div className="py-12 space-y-16 text-left font-['Plus_Jakarta_Sans']">
      
      {/* Verified Customer Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold uppercase">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.9/5 RATING FROM 2,000+ CUSTOMERS
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 font-['Outfit']">
            Real words from people who <span className="gradient-text font-black">published surprises</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Read verified feedback from creators celebrating birthdays, anniversaries, long-distance relationships, and proposals.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md hover:border-pink-300 transition-all"
            >
              <Quote className="w-8 h-8 text-pink-500/60" />
              
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic flex-1">
                "{t.comment}"
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-pink-400" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {t.name} <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </h4>
                  <span className="text-[10px] text-pink-600 font-bold">{t.occasion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
