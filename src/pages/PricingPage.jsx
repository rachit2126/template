import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('lifetime');

  const plans = [
    {
      name: 'Free Creator',
      price: '$0',
      period: 'Forever Free',
      description: 'Ideal for trying out Cutiepage and creating your first surprise.',
      features: [
        '1 Active Surprise Page',
        'Standard Background Music',
        'Photo Gallery (up to 3 photos)',
        'Basic Sealed Letter',
        'Public Link Sharing'
      ],
      cta: 'Get Started Free',
      popular: false,
      btnStyle: 'btn-secondary'
    },
    {
      name: 'Surprise Pro',
      price: billingCycle === 'lifetime' ? '$29' : '$12',
      period: billingCycle === 'lifetime' ? 'One-Time Payment (Lifetime Access)' : 'per month',
      description: 'Our most popular plan for creating unlimited magical surprises.',
      features: [
        'Unlimited Surprise Pages',
        'All 50+ Premium Templates',
        'AI Studio Wish Generator',
        'Custom Music Track Autoplay',
        'Password PIN Lock Protection',
        'Interactive Scratch Cards & Games',
        'Real-time Link Analytics',
        'Printable High-Res QR Code'
      ],
      cta: 'Unlock Pro Studio ✨',
      popular: true,
      btnStyle: 'btn-primary'
    },
    {
      name: 'Event Enterprise',
      price: '$49',
      period: 'per month',
      description: 'Designed for wedding planners, event organizers, and creators.',
      features: [
        'Everything in Pro Plan',
        'Custom Domain Support (yourbrand.com)',
        'Remove Cutiepage Branding',
        'Priority 24/7 VIP Support',
        'Bulk QR Printing Exports',
        'Team Collaboration (3 seats)'
      ],
      cta: 'Contact Sales',
      popular: false,
      btnStyle: 'btn-secondary'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left font-['Plus_Jakarta_Sans']">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Simple Transparent Pricing
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 font-['Outfit']">
          Pay Once. <span className="gradient-text">Use Forever.</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 font-medium">
          No hidden fees or recurring traps. Pick a plan and start surprising your loved ones.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-slate-100 border border-slate-200 rounded-full p-1 gap-2 mt-4">
          <button 
            onClick={() => setBillingCycle('lifetime')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${billingCycle === 'lifetime' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'}`}
          >
            💖 Pay Once (Lifetime)
          </button>
          <button 
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${billingCycle === 'monthly' ? 'bg-pink-600 text-white shadow-md' : 'text-slate-700 hover:text-slate-900'}`}
          >
            Monthly Plan
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <div 
            key={i} 
            className={`bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between relative shadow-sm hover:shadow-md transition-all ${p.popular ? 'border-2 border-pink-500 shadow-xl shadow-pink-500/10 scale-105 z-10' : ''}`}
          >
            {p.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                ★ Most Popular
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">{p.name}</h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">{p.description}</p>
              </div>

              <div className="border-y border-slate-100 py-4">
                <div className="text-4xl font-extrabold text-slate-900 font-['Outfit'] flex items-baseline gap-1">
                  {p.price} <span className="text-xs text-pink-600 font-normal">{p.period}</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-700 font-medium">
                {p.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-pink-600 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => navigate('/editor')}
                className={`${p.btnStyle} w-full py-3.5 text-sm justify-center`}
              >
                {p.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
