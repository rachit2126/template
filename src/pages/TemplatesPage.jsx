import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Crown, MessageCircle } from 'lucide-react';

const DEFAULT_TEMPLATES = [
  {
    isBundle: true,
    slug: 'cutie-pack-bundle',
    title: 'Cutie Pack (All 17 Templates)',
    category: 'love',
    badge: 'BUNDLE',
    subtitle: 'Get all 17 templates just for ₹999, lifetime access.',
    price: '₹999',
    originalPrice: '₹2,583',
    saveBadge: 'SAVE ₹1,584',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    description: 'Unlock every current and future premium template. Pay once. Access forever with lifetime hosting and instant WhatsApp support!',
    featured: true,
    active: true
  },
  {
    slug: 'sweet-birthday',
    title: 'Sweet Birthday',
    category: 'birthday',
    rating: 5.0,
    reviews: 57,
    price: '₹79',
    originalPrice: '₹419',
    discountBadge: '81% OFF',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    description: '🎉 A cute little surprise they will never forget! Add custom photos, wishes, background music, and instant QR code.',
    featured: true,
    active: true
  },
  {
    slug: 'friendship-day',
    title: 'Friendship Day Special',
    category: 'friendship',
    rating: 5.0,
    reviews: 63,
    price: '₹309',
    originalPrice: '₹618',
    discountBadge: 'FLAT 50% OFF',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    description: '🎈 They tap the link and a hot-air balloon floats up carrying a letter with their name on it. Then your song starts, and the page unfolds...',
    featured: true,
    active: true
  },
  {
    slug: 'romantic-sky-lanterns',
    title: 'Romantic Sky Lanterns',
    category: 'love',
    rating: 4.9,
    reviews: 420,
    price: '₹399',
    originalPrice: '₹798',
    discountBadge: 'FLAT 50% OFF',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    description: '💖 Flying heart balloons carrying a romantic unseal letter with background piano music, custom polaroid photos & memory timeline.',
    featured: true,
    active: true
  },
  {
    slug: 'netflix-style-memory-lane',
    title: 'Netflix Style Love Story',
    category: 'love',
    rating: 5.0,
    reviews: 890,
    price: '₹449',
    originalPrice: '₹898',
    discountBadge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    description: '🎬 Stream your love story like a Netflix movie with episodes, trailers, custom subtitles, and secret message reveals.',
    featured: true,
    active: true
  }
];

export default function TemplatesPage() {
  const navigate = useNavigate();
  const WHATSAPP_NUMBER = '919119055155';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState(DEFAULT_TEMPLATES);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    // 1. Fetch directly from Vercel Serverless MongoDB Atlas API FIRST
    try {
      let res = await fetch('/api/products?active=true');
      if (!res.ok) res = await fetch('http://localhost:5000/api/products?active=true');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          localStorage.setItem('cutiepage_products', JSON.stringify(data));
          return;
        }
      }
    } catch (err) {
      console.log('MongoDB API offline, checking local storage');
    }

    // 2. LocalStorage Fallback if API fails
    const localData = localStorage.getItem('cutiepage_products');
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed.filter(p => p.active !== false));
        }
      } catch (e) {}
    }
  };

  const categories = [
    { id: 'all', name: 'All templates', count: products.length },
    { id: 'anniversary', name: 'Anniversary', count: products.filter(p => p.category === 'anniversary').length },
    { id: 'apology', name: 'Apology', count: products.filter(p => p.category === 'apology').length },
    { id: 'birthday', name: 'Birthday', count: products.filter(p => p.category === 'birthday').length },
    { id: 'family', name: 'Family', count: products.filter(p => p.category === 'family').length },
    { id: 'friendship', name: 'Friendship', count: products.filter(p => p.category === 'friendship').length },
    { id: 'love', name: 'Love', count: products.filter(p => p.category === 'love').length }
  ];

  const handleBuyOnWhatsApp = (templateTitle, price) => {
    const text = encodeURIComponent(`Hi Cutiepage! I would like to buy the template "${templateTitle}" for ${price}. Please share payment details and customization options! 💖`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // Separate Bundle Product (Cutie Pack) vs Regular Templates
  const bundleProduct = useMemo(() => {
    return products.find(p => p.isBundle || p.badge === 'BUNDLE' || p.slug === 'cutie-pack-bundle');
  }, [products]);

  const regularProducts = useMemo(() => {
    return products.filter(p => {
      if (p.isBundle || p.badge === 'BUNDLE' || p.slug === 'cutie-pack-bundle') return false;
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen text-slate-900 font-['Plus_Jakarta_Sans'] pb-28">
      
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center shadow-sm">
        <span>Cutiepage is now <strong>40,000+ Users strong</strong> with <strong>13,000+ Orders!</strong> 💖</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        
        {/* Page Title & Header */}
        <div className="text-left space-y-1.5 mb-6 sm:mb-8 border-b border-slate-200 pb-5">
          <span className="text-xs font-bold text-pink-600 tracking-widest uppercase">TEMPLATES</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            Find the right page and make it yours.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Showing {regularProducts.length + (bundleProduct ? 1 : 0)} of {products.length} designs
          </p>
        </div>

        {/* MOBILE CATEGORY FILTER BAR & SEARCH */}
        <div className="block lg:hidden space-y-4 mb-6 text-left">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((c) => {
              const isSelected = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected 
                      ? 'bg-purple-600 text-white font-extrabold shadow-md' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* DESKTOP SIDEBAR FILTER */}
          <aside className="hidden lg:block lg:col-span-3 bg-white border border-slate-200 p-6 rounded-3xl space-y-6 text-left shadow-sm sticky top-24">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">FILTER</span>
              
              <div className="relative mt-3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Category</span>
              <ul className="space-y-1 text-xs font-medium">
                {categories.map((c) => {
                  const isSelected = selectedCategory === c.id;

                  return (
                    <li key={c.id}>
                      <button 
                        onClick={() => setSelectedCategory(c.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-purple-600 text-white font-bold shadow-sm' 
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <span>{c.name}</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'text-slate-500 bg-slate-100'
                        }`}>
                          {c.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Right Cards Column */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* 1. TOP PINNED BUNDLE CARD: Cutie Pack */}
            {bundleProduct && (
              <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 border-2 border-purple-500/40 p-5 sm:p-8 rounded-3xl relative overflow-hidden text-left space-y-5 shadow-md group">
                <div className="flex items-center justify-between">
                  <span className="bg-purple-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Crown className="w-3 h-3 text-amber-300" /> BUNDLE
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
                    {bundleProduct.discount || bundleProduct.discountBadge || bundleProduct.saveBadge || 'SAVE ₹1,584'}
                  </span>
                </div>

                <div 
                  className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md cursor-pointer" 
                  onClick={() => navigate(`/products/${bundleProduct.slug}`)}
                >
                  <img 
                    src={bundleProduct.image} 
                    alt={bundleProduct.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white text-xs font-bold">
                      💖 Every Premium Template Yours Forever • Pay Once • Lifetime Access
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">{bundleProduct.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">{bundleProduct.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 font-['Outfit']">{bundleProduct.price}</span>
                    {bundleProduct.originalPrice && <span className="text-xs text-slate-500 line-through font-semibold">{bundleProduct.originalPrice}</span>}
                    <span className="text-[10px] text-pink-600 font-bold uppercase tracking-wider">ONE-TIME</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => navigate(`/products/${bundleProduct.slug}`)}
                      className="btn-secondary text-xs py-2.5 px-4 bg-white border-slate-300 text-slate-800 hover:bg-slate-50 font-bold cursor-pointer"
                    >
                      See details
                    </button>
                    <button 
                      onClick={() => handleBuyOnWhatsApp(bundleProduct.title, bundleProduct.price)}
                      className="btn-primary text-xs py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Buy on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. REGULAR TEMPLATES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularProducts.map((item, idx) => {
                const itemSlug = item.slug || item._id || `template-${idx}`;
                
                return (
                  <div 
                    key={itemSlug}
                    className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-between text-left group shadow-sm hover:border-purple-400 hover:shadow-md transition-all"
                  >
                    <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => navigate(`/products/${itemSlug}`)}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      {(item.discount || item.discountBadge) && (
                        <div className="absolute bottom-3 left-3 bg-purple-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                          {item.discount || item.discountBadge}
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 
                          onClick={() => navigate(`/products/${itemSlug}`)}
                          className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit'] group-hover:text-purple-600 transition-colors cursor-pointer"
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-1.5 pt-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-slate-900">5.0</span>
                          <span className="text-xs text-slate-500">(Verified)</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="text-xl font-extrabold text-slate-900 font-['Outfit']">
                          {item.price}
                        </div>

                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => navigate(`/products/${itemSlug}`)}
                            className="btn-secondary text-xs py-2 px-3 bg-white border-slate-300 text-slate-800 hover:bg-slate-50 font-bold cursor-pointer"
                          >
                            Take a look
                          </button>
                          <button 
                            onClick={() => handleBuyOnWhatsApp(item.title, item.price)}
                            className="btn-primary text-xs py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 shadow-sm cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> Buy Now
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </main>

        </div>

      </div>

    </div>
  );
}
