import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ExternalLink, Zap, QrCode, Infinity, Check, ArrowLeft, MessageCircle, Heart, Lock, ShieldCheck, Music, Sparkles } from 'lucide-react';

export default function TemplateDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const WHATSAPP_NUMBER = '919119055155';
  const [activeTab, setActiveTab] = useState('details');
  const [timeLeft, setTimeLeft] = useState('13:52:47');

  const templatesData = {
    'sweet-birthday': {
      title: 'Sweet Birthday',
      category: 'birthday',
      rating: 5.0,
      reviewsCount: 57,
      priceINR: '₹79 INR',
      originalPriceINR: '₹419',
      discountBadge: '81% OFF',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
      demoSlug: 'sweet-birthday-demo',
      description: 'A cute little surprise they will never forget! Features custom birthday wishes, photo slider, romantic background music player, and instant QR code.',
      featuresList: [
        'Interactive birthday unseal note with customizable name',
        'High-definition photo album gallery (up to 10 photos)',
        'Autoplay romantic acoustic song background music',
        'Printable high-resolution QR code for physical gifts',
        '100% private & protected with optional 4-digit PIN lock'
      ]
    },
    'friendship-day': {
      title: 'Friendship Day',
      category: 'friendship',
      rating: 5.0,
      reviewsCount: 63,
      priceINR: '₹309 INR',
      originalPriceINR: '₹618',
      discountBadge: '50% OFF',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
      demoSlug: 'friendship-demo',
      description: 'They tap the link and a hot-air balloon floats up carrying a letter with their name on it. Then your song starts, and the page unfolds with memories, custom photos, and secret wishes.',
      featuresList: [
        'Floating hot-air balloon unseal animation',
        'Memory timeline of your best moments together',
        'Custom voice note or song player integration',
        'Instant private web link with lifetime validity'
      ]
    },
    'romantic-sky-lanterns': {
      title: 'Romantic Sky Lanterns',
      category: 'love',
      rating: 4.9,
      reviewsCount: 420,
      priceINR: '₹399 INR',
      originalPriceINR: '₹798',
      discountBadge: '50% OFF',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
      demoSlug: 'sky-lanterns-demo',
      description: 'Flying heart balloons carrying a romantic unseal letter with background piano music, custom polaroid photos & memory timeline.',
      featuresList: [
        'Floating lantern particles background',
        'Unseal letter with handwritten cursive typography',
        'Polaroid memory photo wall slider',
        'Background romantic piano melody player'
      ]
    },
    'cutie-pack-bundle': {
      title: 'Cutie Pack (All 17 Templates)',
      category: 'love',
      rating: 5.0,
      reviewsCount: 1200,
      priceINR: '₹999 INR',
      originalPriceINR: '₹2,583',
      discountBadge: 'SAVE ₹1,584',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
      demoSlug: 'ananya-anniversary-demo',
      description: 'Unlock every current and future premium template with lifetime access. Pay once and use unlimited times for any occasion!',
      featuresList: [
        'Access to all 17+ present and future template designs',
        'Unlimited page creations & instant WhatsApp fulfillment',
        'No watermarks, no recurring subscriptions, no expiry',
        'Includes VIP custom domain support & 24/7 assistance'
      ]
    }
  };

  const currentSlug = slug || 'sweet-birthday';
  const template = templatesData[currentSlug] || {
    title: currentSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: 'love',
    rating: 5.0,
    reviewsCount: 57,
    priceINR: '₹79 INR',
    originalPriceINR: '₹419',
    discountBadge: '81% OFF',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    demoSlug: 'demo',
    description: 'A cute little surprise page they will never forget! Add your details, hit order, and share the live link or QR code.',
    featuresList: [
      'Interactive unseal note animation',
      'Photo memory gallery album',
      'Autoplay romantic song music player',
      'Printable QR code & private share link'
    ]
  };

  const relatedTemplates = [
    { title: 'Friendship Day', slug: 'friendship-day', price: '₹309', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80' },
    { title: 'Romantic Sky Lanterns', slug: 'romantic-sky-lanterns', price: '₹399', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80' },
    { title: 'Netflix Style Love Story', slug: 'netflix-style-memory-lane', price: '₹449', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80' }
  ];

  const handleOrderWhatsApp = () => {
    const text = encodeURIComponent(`Hi Cutiepage! I want to order the template "${template.title}" (${template.priceINR}). Please guide me with customization & payment details! 💖`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen text-slate-900 font-['Plus_Jakarta_Sans'] pb-20 text-left">
      
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center shadow-sm">
        <span>Use code <strong>LOVE50</strong> for flat 50% off Girlfriend's Day 💖</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-8">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate('/templates')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>

        {/* 2-Column Product Detail Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column - Product Preview Card (6 Cols) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 p-4 sm:p-6 rounded-3xl shadow-sm space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-100 bg-pink-50 h-80 sm:h-[480px]">
              <img 
                src={template.image} 
                alt={template.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-pink-600 px-2.5 py-0.5 rounded-full">
                    CUSTOMIZABLE TEMPLATE
                  </span>
                  <h3 className="text-2xl font-extrabold font-['Outfit']">{template.title}</h3>
                  <p className="text-xs text-pink-100">A cute little surprise they'll never forget. 💖</p>
                </div>
              </div>
            </div>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-slate-700 pt-2">
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex flex-col items-center gap-1">
                <Zap className="w-4 h-4 text-purple-600" />
                <span>Ready in 30s</span>
              </div>
              <div className="p-3 bg-pink-50 rounded-xl border border-pink-100 flex flex-col items-center gap-1">
                <QrCode className="w-4 h-4 text-pink-600" />
                <span>Instant QR</span>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex flex-col items-center gap-1">
                <Infinity className="w-4 h-4 text-indigo-600" />
                <span>Lifetime Link</span>
              </div>
            </div>
          </div>

          {/* Right Column - Product Buy & WhatsApp Details (6 Cols) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl space-y-6 shadow-sm">
            
            {/* Rating */}
            <div className="flex items-center gap-1.5 text-xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-900">{template.rating}</span>
              <span className="text-slate-500 font-medium">({template.reviewsCount} reviews)</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
              {template.title}
            </h1>

            {/* Action Buttons: WhatsApp Order & Demo Preview */}
            <div className="space-y-3 pt-2">
              <button 
                onClick={handleOrderWhatsApp}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white text-white" />
                <span>Order on WhatsApp · {template.priceINR}</span>
              </button>

              <button 
                onClick={() => navigate(`/publish/${template.demoSlug}`)}
                className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2 border border-slate-200"
              >
                <span>Take a preview</span>
                <ExternalLink className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* Price Box */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900 font-['Outfit']">{template.priceINR}</span>
                <span className="text-sm text-slate-400 line-through font-semibold">{template.originalPriceINR}</span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {template.discountBadge}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-purple-600">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
                <span>Price goes up in {timeLeft}</span>
              </div>
            </div>

            {/* Description Checklist */}
            <div className="space-y-4 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Made by professionals
                  <span className="text-slate-500 font-normal">— Designed and animated by real designers. Premium one-of-a-kind page.</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Ready in 30 seconds
                  <span className="text-slate-500 font-normal">— Send photos, names & words, get your live link instantly.</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Feels expensive and personal
                  <span className="text-slate-500 font-normal">— Looks like it was crafted just for them. Way better than plain cards.</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  Fill, publish, share
                  <span className="text-slate-500 font-normal">— Share the link or printable QR code. That is it.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Product Information Tabs Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
            <button 
              onClick={() => setActiveTab('details')} 
              className={`pb-3 transition-colors border-b-2 ${activeTab === 'details' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              What's Included
            </button>
            <button 
              onClick={() => setActiveTab('how')} 
              className={`pb-3 transition-colors border-b-2 ${activeTab === 'how' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              How It Works
            </button>
            <button 
              onClick={() => setActiveTab('faq')} 
              className={`pb-3 transition-colors border-b-2 ${activeTab === 'faq' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              FAQ
            </button>
          </div>

          {/* Tab 1: Details */}
          {activeTab === 'details' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <p className="leading-relaxed font-medium">{template.description}</p>
              <ul className="space-y-2.5 pt-2">
                {template.featuresList.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 font-semibold text-slate-900">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tab 2: How It Works */}
          {activeTab === 'how' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-slate-900">Contact & Order on WhatsApp</h4>
                  <p className="text-slate-600 font-medium mt-0.5">Click the "Order on WhatsApp" button to send your template request.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-slate-900">Share Your Photos & Text</h4>
                  <p className="text-slate-600 font-medium mt-0.5">Send the recipient's name, custom photos, letter text, and background song choice.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-slate-900">Get Your Live Link & Printable QR</h4>
                  <p className="text-slate-600 font-medium mt-0.5">Your page goes live instantly with permanent lifetime hosting and password protection!</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">Does the link ever expire?</h4>
                <p className="text-slate-600">No, every published page stays active for life with no recurring fees.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">Can I protect it with a password?</h4>
                <p className="text-slate-600">Yes! You can choose any 4-digit PIN lock so only your recipient can unseal the surprise.</p>
              </div>
            </div>
          )}
        </div>

        {/* Related Templates */}
        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-extrabold text-slate-900 font-['Outfit']">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTemplates.map((t) => (
              <Link 
                key={t.slug}
                to={`/products/${t.slug}`} 
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden group shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{t.title}</h4>
                    <span className="text-xs text-slate-500 font-medium">{t.price}</span>
                  </div>
                  <span className="btn-secondary text-xs py-1.5 px-3 bg-purple-50 text-purple-700 font-bold border-purple-200">
                    View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
