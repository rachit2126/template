import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, ShieldCheck, Music, Sparkles, Smartphone, 
  Infinity, ArrowRight, CheckCircle2, XCircle, Crown, Lock
} from 'lucide-react';

export default function FeaturesGrid() {
  const navigate = useNavigate();

  const comparisonRows = [
    {
      feature: 'Ready to share',
      cutiepage: 'Live in under 30 seconds',
      others: 'Hours of dragging and exporting'
    },
    {
      feature: 'A real shareable link',
      cutiepage: 'Clean link + live QR code',
      others: 'A static image or PDF'
    },
    {
      feature: 'Edit after you publish',
      cutiepage: 'Change anything, anytime',
      others: 'Start over from scratch'
    },
    {
      feature: 'Looks great on phones',
      cutiepage: 'Built mobile-first',
      others: 'Breaks outside the canvas'
    },
    {
      feature: 'Design skill needed',
      cutiepage: 'None, just fill it in',
      others: 'You do the heavy lifting'
    },
    {
      feature: 'Pricing',
      cutiepage: 'Pay once, use again and again',
      others: 'Subscriptions & hidden fees'
    }
  ];

  return (
    <section id="features" className="py-20 relative text-left font-['Plus_Jakarta_Sans'] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            MODERN BENTO FEATURE SHOWCASE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            Why Millions Choose <span className="gradient-text">Cutiepage</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto">
            A state-of-the-art interactive Bento Grid designed for maximum emotional impact and seamless performance.
          </p>
        </div>

        {/* MODERN BENTO BOX FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* BENTO CARD 1: HERO FEATURE (2 Cols Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/templates')}
            className="lg:col-span-2 bg-gradient-to-br from-white via-purple-50/40 to-pink-50/40 border border-slate-200/90 rounded-[32px] p-8 sm:p-10 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:border-purple-400 hover:-translate-y-2 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer overflow-hidden relative"
          >
            <div className="space-y-4 max-w-md text-left z-10">
              <span className="bg-purple-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-sm">
                <Zap className="w-3 h-3 text-amber-300" /> SPEED & SIMPLICITY
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] group-hover:text-purple-600 transition-colors">
                30-Second Setup
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Create, customize, and publish your personalized digital surprise page in under 30 seconds with zero technical or design skills needed.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-extrabold text-purple-600 group-hover:text-pink-600 transition-colors">
                <span>Try Template Setup Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>

            <div className="w-full md:w-1/2 h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative flex-shrink-0">
              <img 
                src="/feat_1.png" 
                alt="30-Second Setup" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-bold">⚡ Ready to share in 30 seconds</span>
              </div>
            </div>
          </motion.div>

          {/* BENTO CARD 2: PRIVATE & SECURE (1 Col Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => navigate('/templates')}
            className="lg:col-span-1 bg-white border border-slate-200/90 rounded-[32px] p-7 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:border-purple-400 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group cursor-pointer overflow-hidden relative"
          >
            <div className="h-48 rounded-2xl overflow-hidden border border-slate-100 relative mb-5">
              <img 
                src="/feat_2.png" 
                alt="100% Private & Secure" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/20 p-2 rounded-xl text-white">
                <Lock className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-700 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  VAULT SECURITY
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit'] group-hover:text-purple-600 transition-colors">
                100% Private & Secure
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Protected with custom 4-digit PIN locks so only your recipient unseals the secret.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>Security Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* BENTO CARD 3: CUSTOM AUDIO & VOICE NOTES (1 Col Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => navigate('/templates')}
            className="lg:col-span-1 bg-white border border-slate-200/90 rounded-[32px] p-7 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:border-pink-400 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group cursor-pointer overflow-hidden relative"
          >
            <div className="h-48 rounded-2xl overflow-hidden border border-slate-100 relative mb-5">
              <img 
                src="/feat_3.png" 
                alt="Custom Audio" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-pink-600 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                🎵 AUTOPLAY MUSIC
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit'] group-hover:text-pink-600 transition-colors">
                Custom Audio & Song Player
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Autoplay romantic acoustic tracks & voice notes that trigger happy tears instantly.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-600">
              <span>Listen Sample</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* BENTO CARD 4: INTERACTIVE PHYSICS (1 Col Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => navigate('/templates')}
            className="lg:col-span-1 bg-white border border-slate-200/90 rounded-[32px] p-7 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:border-rose-400 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group cursor-pointer overflow-hidden relative"
          >
            <div className="h-48 rounded-2xl overflow-hidden border border-slate-100 relative mb-5">
              <img 
                src="/feat_4.png" 
                alt="Interactive Physics" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-rose-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
                🎈 BALLOONS & PARTICLES
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit'] group-hover:text-rose-600 transition-colors">
                Interactive 3D Animations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Floating heart balloons, unsealable letters, rose petal rain, and sparkling fireworks.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
              <span>See Animations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* BENTO CARD 5: WORKS EVERYWHERE & LIFETIME ACCESS (2 Cols Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => navigate('/templates')}
            className="lg:col-span-2 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/40 border border-slate-200/90 rounded-[32px] p-8 sm:p-10 shadow-lg shadow-slate-200/40 hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-2 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer overflow-hidden relative"
          >
            <div className="w-full md:w-1/2 h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative flex-shrink-0 order-2 md:order-1">
              <img 
                src="/feat_5.png" 
                alt="Works Everywhere" 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 bg-indigo-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                📱 MOBILE & DESKTOP SYNC
              </div>
            </div>

            <div className="space-y-4 max-w-md text-left z-10 order-1 md:order-2">
              <span className="bg-indigo-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-sm">
                <Infinity className="w-3 h-3 text-amber-300" /> CROSS PLATFORM & LIFETIME
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] group-hover:text-indigo-600 transition-colors">
                Works Everywhere & Lifetime Access
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Flawless responsive display across iPhone, Android, iPad, and MacBook with permanent lifetime hosting and zero recurring fees.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-extrabold text-indigo-600 group-hover:text-purple-600 transition-colors">
                <span>View All Template Options</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* COMPARISON TABLE FROM CUTIEPAGE.IN */}
        <div className="pt-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              Anyone can hand you a flat file and call it a gift. We hand you a living page that is crafted, hosted, and ready to share in seconds.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-6 px-6 font-extrabold text-slate-900 text-lg sm:text-xl font-['Outfit'] w-1/3">
                      Why CutiePage is best
                    </th>
                    <th className="py-6 px-6 bg-purple-50/80 border-x border-purple-200/60 text-center w-1/3">
                      <span className="bg-purple-600 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1.5 shadow-sm">
                        RECOMMENDED
                      </span>
                      <div className="text-lg font-black text-purple-700 font-['Outfit'] flex items-center justify-center gap-1">
                        <Crown className="w-4 h-4 text-amber-500 fill-amber-500" /> Cutiepage
                      </div>
                    </th>
                    <th className="py-6 px-6 text-center text-slate-400 font-semibold text-xs sm:text-sm w-1/3">
                      Canva & other "creators"
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-900">
                        {row.feature}
                      </td>
                      <td className="py-5 px-6 bg-purple-50/40 border-x border-purple-200/40 text-center">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">{row.cutiepage}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-center">
                        <div className="flex flex-col items-center justify-center gap-1 text-slate-400">
                          <XCircle className="w-5 h-5 text-rose-400 fill-rose-50" />
                          <span className="text-xs text-slate-500 font-medium">{row.others}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Conversion Banner Callout */}
        <div className="mt-14 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-xl">
          <div className="text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Ready to create your first surprise? 🎁
            </h3>
            <p className="text-xs sm:text-sm text-pink-100 mt-2">
              Join over 32,900+ creators. Create your personalized web page in less than 30 seconds.
            </p>
          </div>
          <button 
            onClick={() => navigate('/templates')}
            className="btn-secondary text-base py-4 px-8 whitespace-nowrap bg-white text-slate-900 border-none hover:bg-slate-100 shadow-lg font-bold"
          >
            Explore Templates Now ✨
          </button>
        </div>

      </div>
    </section>
  );
}
