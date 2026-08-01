import React from 'react';
import { Quote, CheckCircle } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-12 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] flex items-center gap-2">
              Loved by Thousands <span className="text-pink-500">❤️</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Real stories from real people who created unforgettable surprises
            </p>
          </div>
          <div className="text-xs text-pink-600 font-bold mt-2 sm:mt-0 flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            100% Verified Customer Ratings
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div key={item.id} className="glass-card p-6 flex flex-col justify-between relative group bg-white border border-slate-200 shadow-sm">
              
              <Quote className="w-8 h-8 text-pink-400/40 mb-3 group-hover:text-pink-500 transition-colors" />

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-6 flex-1 italic">
                "{item.comment}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-10 h-10 rounded-full object-cover border border-pink-400"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-pink-600 font-bold">
                    {item.role}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
