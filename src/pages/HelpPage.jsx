import React from 'react';
import FAQSection from '../components/FAQSection';
import { HelpCircle, Mail, MessageSquare } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-bold uppercase">
          <HelpCircle className="w-3.5 h-3.5" /> 24/7 Support Center
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-['Outfit']">
          How Can We <span className="gradient-text">Help You?</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Find quick answers, troubleshooting steps, or get in touch with our customer happiness team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-400">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit']">Email Support</h3>
            <p className="text-xs text-slate-300">support@cutiepage.com — Average response time under 1 hour.</p>
          </div>
        </div>

        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit']">Live Chat</h3>
            <p className="text-xs text-slate-300">Chat live with our surprise specialists on WhatsApp or in-app.</p>
          </div>
        </div>
      </div>

      <FAQSection />
    </div>
  );
}
