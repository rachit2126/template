import React from 'react';
import { stats } from '../data/testimonials';

export default function StatsSection() {
  return (
    <section className="py-6 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel py-8 px-6 sm:px-10 bg-white border border-slate-200 shadow-md rounded-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {stats.map((stat, index) => (
              <div key={index} className={`flex flex-col items-center justify-center p-2 ${index > 0 ? 'pt-4 md:pt-2' : ''}`}>
                <div className="text-3xl mb-2 animate-bounce">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
