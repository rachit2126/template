import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function ProductSlider() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const WHATSAPP_NUMBER = '919119055155';
  const [selectedFilter, setSelectedFilter] = useState('all');

  const products = [
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
      description: '🎉 A cute little birthday surprise they will never forget with song autoplay & custom photos.'
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
      description: '🎈 Floating hot-air balloon unseal letter carrying their name with background music.'
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
      description: '💖 Flying heart balloons carrying a romantic unseal letter with background piano music.'
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
      description: '🎬 Stream your love story like a Netflix movie with episodes, trailers, and subtitles.'
    },
    {
      slug: 'golden-anniversary-vows',
      title: 'Golden Anniversary Vows',
      category: 'anniversary',
      rating: 4.9,
      reviews: 310,
      price: '₹499',
      originalPrice: '₹998',
      discountBadge: 'LUXURY',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      description: '💍 Elegant golden theme, wedding vows audio player, countdown clock & wishes book.'
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleBuyOnWhatsApp = (templateTitle, price) => {
    const text = encodeURIComponent(`Hi Cutiepage! I would like to buy the template "${templateTitle}" for ${price}. Please share payment details and customization options! 💖`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const filteredProducts = selectedFilter === 'all' 
    ? products 
    : products.filter(p => p.category === selectedFilter);

  return (
    <section className="py-12 relative text-left font-['Plus_Jakarta_Sans'] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> POPULAR TEMPLATES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
              Featured Surprise <span className="gradient-text">Pages</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
              Handcrafted digital surprises ready to customize and share in 30 seconds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/templates')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors mr-2"
            >
              <span>Browse All Templates</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Slider Navigation Arrows */}
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-600 transition-all shadow-md shadow-pink-500/20"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 text-xs font-bold scrollbar-none">
          {['all', 'birthday', 'love', 'anniversary', 'friendship'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedFilter === cat 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Templates' : cat}
            </button>
          ))}
        </div>

        {/* Product Carousel Cards Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((item) => (
            <div 
              key={item.slug}
              className="w-80 sm:w-96 flex-shrink-0 snap-start bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl hover:border-purple-400 transition-all duration-300"
            >
              {/* Product Image */}
              <div 
                className="relative h-52 overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => navigate(`/products/${item.slug}`)}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                {item.discountBadge && (
                  <div className="absolute bottom-3 left-3 bg-purple-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                    {item.discountBadge}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 
                    onClick={() => navigate(`/products/${item.slug}`)}
                    className="text-lg font-extrabold text-slate-900 font-['Outfit'] group-hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-900">{item.rating}</span>
                    <span className="text-xs text-slate-500 font-medium">({item.reviews})</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-slate-900 font-['Outfit']">{item.price}</span>
                    <span className="text-xs text-slate-400 line-through font-semibold">{item.originalPrice}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate(`/products/${item.slug}`)}
                      className="btn-secondary text-xs py-2 px-3 bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200 font-bold"
                    >
                      Take a look
                    </button>
                    <button 
                      onClick={() => handleBuyOnWhatsApp(item.title, item.price)}
                      className="btn-primary text-xs py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Buy
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
