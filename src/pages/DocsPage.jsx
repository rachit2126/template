import React from 'react';
import { BookOpen, Code, Key, Cpu } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left font-['Plus_Jakarta_Sans']">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase">
          <BookOpen className="w-3.5 h-3.5" /> Developer & Platform Docs
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 font-['Outfit']">
          Platform <span className="gradient-text">Documentation</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 font-medium">
          Guides, API reference, custom domain integration, and embedding options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-sm">
          <Code className="w-6 h-6 text-pink-600" />
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Getting Started</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">Learn how to create, customize, and publish your first digital surprise page.</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-sm">
          <Key className="w-6 h-6 text-amber-600" />
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Custom Domains & Security</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">Set up custom domains (love.yourname.com) and configure 4-digit PIN locks.</p>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-sm">
          <Cpu className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">API & Webhooks</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">Integrate Cutiepage surprises into event management apps and wedding sites.</p>
        </div>
      </div>
    </div>
  );
}
