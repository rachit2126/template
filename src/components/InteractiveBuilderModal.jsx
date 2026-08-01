import React, { useState } from 'react';
import { X, Sparkles, Heart, Music, Lock, Image as ImageIcon, QrCode, Copy, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { occasions } from '../data/occasions';

export default function InteractiveBuilderModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState(occasions[1]); // Default Love
  const [recipientName, setRecipientName] = useState('Ananya');
  const [senderName, setSenderName] = useState('Rahul');
  const [secretMessage, setSecretMessage] = useState('You make my world beautiful every single day. Happy Anniversary!');
  const [password, setPassword] = useState('');
  const [enablePassword, setEnablePassword] = useState(false);
  const [musicTrack, setMusicTrack] = useState('Romantic Piano Harmony');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generatedUrl = `https://cutiepage.com/s/${selectedOccasion.id}/${encodeURIComponent(recipientName.toLowerCase())}-love-2026`;

  const handleFinish = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setStep(3);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#120926] border border-white/20 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#1A0E35]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">Surprise Studio</h3>
              <p className="text-xs text-pink-300">Step {step} of 3 — Personalize Your Magic Page</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-left">
          
          {/* STEP 1: Select Occasion */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white mb-2">1. Choose Occasion</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {occasions.map((occ) => (
                    <div 
                      key={occ.id}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                        selectedOccasion.id === occ.id
                          ? 'bg-pink-500/20 border-pink-500 shadow-lg shadow-pink-500/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl mb-1">{occ.icon}</span>
                      <span className="text-xs font-bold text-white">{occ.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">2. Who is this surprise for?</label>
                <input 
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Recipient Name (e.g. Ananya)"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">3. Your Name (Sender)</label>
                <input 
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your Name (e.g. Rahul)"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Customize Message, Audio & Security */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-white mb-2 flex items-center justify-between">
                  <span>Secret Wish Message</span>
                  <span className="text-xs text-pink-400 font-normal">Supports Emojis</span>
                </label>
                <textarea 
                  rows="3"
                  value={secretMessage}
                  onChange={(e) => setSecretMessage(e.target.value)}
                  placeholder="Write your heart out..."
                  className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Music className="w-4 h-4 text-pink-400" />
                  <span>Select Background Music Track</span>
                </label>
                <select 
                  value={musicTrack}
                  onChange={(e) => setMusicTrack(e.target.value)}
                  className="w-full bg-[#1A0E35] border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="Romantic Piano Harmony">🎵 Romantic Piano Harmony</option>
                  <option value="Acoustic Guitar Love Melody">🎸 Acoustic Guitar Love Melody</option>
                  <option value="Happy Birthday Jazz Party">🎷 Happy Birthday Jazz Party</option>
                  <option value="Soft Violin Dreams">🎻 Soft Violin Dreams</option>
                </select>
              </div>

              {/* Security Lock Toggle */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Password Protection</h4>
                    <p className="text-[11px] text-slate-400">Require secret pin code to unlock page</p>
                  </div>
                </div>

                <input 
                  type="checkbox"
                  checked={enablePassword}
                  onChange={(e) => setEnablePassword(e.target.checked)}
                  className="w-5 h-5 accent-pink-500 cursor-pointer"
                />
              </div>

              {enablePassword && (
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set 4-digit PIN (e.g. 1402)"
                  maxLength="4"
                  className="w-full bg-black/40 border border-amber-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              )}
            </div>
          )}

          {/* STEP 3: Shareable Link Generated */}
          {step === 3 && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-pink-500/20 border-2 border-pink-400 flex items-center justify-center text-3xl mx-auto text-pink-400 animate-bounce">
                🎉
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-['Outfit']">Surprise Link Ready!</h3>
                <p className="text-xs text-pink-300 mt-1">Your secret page for {recipientName} has been crafted & hosted.</p>
              </div>

              {/* URL Display */}
              <div className="bg-black/50 border border-pink-500/30 rounded-2xl p-4 flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-pink-300 truncate">{generatedUrl}</span>
                <button 
                  onClick={copyToClipboard}
                  className="btn-primary text-xs py-2 px-4 whitespace-nowrap flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              {/* QR Code Demo */}
              <div className="p-4 bg-white rounded-2xl w-36 h-36 mx-auto flex flex-col items-center justify-center text-slate-900 border-4 border-pink-500/50 shadow-xl">
                <QrCode className="w-24 h-24 text-slate-900" />
                <span className="text-[9px] font-bold tracking-widest uppercase mt-1">Scan QR Code</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#1A0E35] flex items-center justify-between">
          {step > 1 && step < 3 ? (
            <button 
              onClick={() => setStep(step - 1)}
              className="btn-secondary text-xs py-2 px-4 flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {step === 1 && (
            <button 
              onClick={() => setStep(2)}
              className="btn-primary text-xs py-2.5 px-6 ml-auto flex items-center gap-1.5"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 2 && (
            <button 
              onClick={handleFinish}
              className="btn-primary text-xs py-2.5 px-6 ml-auto flex items-center gap-1.5"
            >
              Generate Magic Link ✨
            </button>
          )}

          {step === 3 && (
            <button 
              onClick={onClose}
              className="btn-primary text-xs py-2.5 px-6 w-full"
            >
              Done & Close Studio 💖
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
