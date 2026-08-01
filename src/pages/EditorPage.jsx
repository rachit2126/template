import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Layers, Image as ImageIcon, Music, Lock, Play, Save, Share2, 
  Smartphone, Tablet, Monitor, Undo, Redo, Wand2, Sliders, Check, ArrowLeft, Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EditorPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('canvas'); // canvas, layers, assets, ai, music, security
  const [deviceView, setDeviceView] = useState('mobile'); // mobile, tablet, desktop
  const [recipientName, setRecipientName] = useState('Ananya');
  const [senderName, setSenderName] = useState('Rahul');
  const [occasion, setOccasion] = useState('Anniversary');
  const [wishText, setWishText] = useState('You make my world beautiful every single day. Happy Anniversary! 💖');
  const [selectedMusic, setSelectedMusic] = useState('Romantic Piano Harmony');
  const [pinLock, setPinLock] = useState('1234');
  const [enablePin, setEnablePin] = useState(false);
  const [savedStatus, setSavedStatus] = useState('Saved just now');
  const [aiGenerating, setAiGenerating] = useState(false);

  const handleSave = () => {
    setSavedStatus('Saving...');
    setTimeout(() => {
      setSavedStatus('Draft autosaved');
      confetti({ particleCount: 40, spread: 60 });
    }, 600);
  };

  const handleAiGenerate = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setWishText('From the first moment our paths crossed, every second with you has felt like poetry. You are my home, my joy, and my forever love. ✨💖');
      setAiGenerating(false);
      confetti({ particleCount: 50, spread: 70 });
    }, 1200);
  };

  const handlePublish = () => {
    confetti({ particleCount: 120, spread: 100 });
    navigate('/publish/ananya-anniversary-demo');
  };

  return (
    <div className="h-screen w-screen bg-[#0A0516] text-white flex flex-col overflow-hidden select-none font-['Plus_Jakarta_Sans']">
      
      {/* Top Workspace Header Bar */}
      <header className="h-14 bg-[#120926] border-b border-white/10 px-4 flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white font-['Outfit']">
              {projectId ? `Draft #${projectId}` : `${recipientName}'s ${occasion} Surprise`}
            </span>
            <span className="text-[10px] font-semibold text-pink-400 bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-400/30">
              {savedStatus}
            </span>
          </div>
        </div>

        {/* Center: Device View Switcher */}
        <div className="hidden md:flex items-center bg-black/40 border border-white/10 rounded-xl p-1 gap-1">
          <button 
            onClick={() => setDeviceView('mobile')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${deviceView === 'mobile' ? 'bg-pink-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
          <button 
            onClick={() => setDeviceView('tablet')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${deviceView === 'tablet' ? 'bg-pink-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Tablet className="w-3.5 h-3.5" /> Tablet
          </button>
          <button 
            onClick={() => setDeviceView('desktop')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${deviceView === 'desktop' ? 'bg-pink-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/publish/ananya-anniversary-demo')}
            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-pink-400" /> Preview
          </button>

          <button 
            onClick={handleSave}
            className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"
          >
            <Save className="w-3.5 h-3.5 text-amber-300" /> Save
          </button>

          <button 
            onClick={handlePublish}
            className="btn-primary text-xs py-1.5 px-4 flex items-center gap-1 shadow-lg shadow-pink-500/30"
          >
            <Share2 className="w-3.5 h-3.5" /> Publish ✨
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar Dock */}
        <aside className="w-16 bg-[#0E061E] border-r border-white/10 flex flex-col items-center py-4 gap-4 flex-shrink-0">
          <button 
            onClick={() => setActiveTab('canvas')}
            className={`w-10 h-10 rounded-2xl flex flex-col items-center justify-center text-[10px] font-bold gap-0.5 transition-all ${activeTab === 'canvas' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Sliders className="w-4 h-4" /> Canvas
          </button>

          <button 
            onClick={() => setActiveTab('ai')}
            className={`w-10 h-10 rounded-2xl flex flex-col items-center justify-center text-[10px] font-bold gap-0.5 transition-all ${activeTab === 'ai' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Wand2 className="w-4 h-4" /> AI Studio
          </button>

          <button 
            onClick={() => setActiveTab('music')}
            className={`w-10 h-10 rounded-2xl flex flex-col items-center justify-center text-[10px] font-bold gap-0.5 transition-all ${activeTab === 'music' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Music className="w-4 h-4" /> Audio
          </button>

          <button 
            onClick={() => setActiveTab('assets')}
            className={`w-10 h-10 rounded-2xl flex flex-col items-center justify-center text-[10px] font-bold gap-0.5 transition-all ${activeTab === 'assets' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <ImageIcon className="w-4 h-4" /> Photos
          </button>

          <button 
            onClick={() => setActiveTab('security')}
            className={`w-10 h-10 rounded-2xl flex flex-col items-center justify-center text-[10px] font-bold gap-0.5 transition-all ${activeTab === 'security' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Lock className="w-4 h-4" /> Security
          </button>
        </aside>

        {/* Left Property Inspector Panel */}
        <aside className="w-80 bg-[#120827] border-r border-white/10 p-5 overflow-y-auto flex-shrink-0 space-y-6 text-left">
          
          {activeTab === 'canvas' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-white font-['Outfit'] border-b border-white/10 pb-2">Page Properties</h3>
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Recipient Name</label>
                <input 
                  type="text" 
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Sender Name</label>
                <input 
                  type="text" 
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Occasion Title</label>
                <select 
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#1A0E35] border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="Anniversary">💍 Anniversary</option>
                  <option value="Birthday">🎂 Birthday</option>
                  <option value="Love">💖 Love & Romance</option>
                  <option value="Best Friends">👥 Best Friends</option>
                  <option value="Proposal">🎁 Proposal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Personal Wish Message</label>
                <textarea 
                  rows="4"
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-['Outfit'] border-b border-white/10 pb-2 flex items-center gap-1.5">
                <Wand2 className="w-4 h-4 text-pink-400" /> AI Studio Copilot
              </h3>
              <p className="text-xs text-slate-300">Generate personalized romantic poems and custom wishes based on recipient name.</p>
              
              <button 
                onClick={handleAiGenerate}
                disabled={aiGenerating}
                className="btn-primary w-full py-2.5 text-xs justify-center shadow-lg"
              >
                {aiGenerating ? 'AI Generating Magic...' : 'Generate AI Wish Message ✨'}
              </button>
            </div>
          )}

          {activeTab === 'music' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-['Outfit'] border-b border-white/10 pb-2">Background Track</h3>
              <select 
                value={selectedMusic}
                onChange={(e) => setSelectedMusic(e.target.value)}
                className="w-full bg-[#1A0E35] border border-white/15 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Romantic Piano Harmony">🎵 Romantic Piano Harmony</option>
                <option value="Acoustic Guitar Love Melody">🎸 Acoustic Guitar Love Melody</option>
                <option value="Happy Birthday Jazz Party">🎷 Happy Birthday Jazz Party</option>
              </select>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white font-['Outfit'] border-b border-white/10 pb-2">PIN Security</h3>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xs font-bold text-white">Enable Password Lock</span>
                <input 
                  type="checkbox" 
                  checked={enablePin} 
                  onChange={(e) => setEnablePin(e.target.checked)}
                  className="accent-pink-500" 
                />
              </div>

              {enablePin && (
                <input 
                  type="password"
                  maxLength="4"
                  value={pinLock}
                  onChange={(e) => setPinLock(e.target.value)}
                  placeholder="Set 4-digit PIN"
                  className="w-full bg-black/40 border border-amber-500/40 rounded-xl px-3 py-2 text-xs text-white"
                />
              )}
            </div>
          )}

        </aside>

        {/* Central Canvas Preview Stage */}
        <main className="flex-1 bg-[#070310] flex items-center justify-center p-6 relative overflow-auto">
          <div 
            className={`transition-all duration-300 bg-[#120727] rounded-3xl border-4 border-[#2A1D47] shadow-2xl overflow-hidden relative flex flex-col justify-between p-6 ${
              deviceView === 'mobile' ? 'w-[320px] h-[640px]' : deviceView === 'tablet' ? 'w-[540px] h-[700px]' : 'w-[840px] h-[640px]'
            }`}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#2A1D47] rounded-b-xl" />

            <div className="pt-6 text-center space-y-4">
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest bg-pink-500/20 px-3 py-1 rounded-full border border-pink-400/30">
                {occasion} Special
              </span>

              <h2 className="text-2xl font-extrabold font-['Outfit'] gradient-text">
                Happy {occasion}, {recipientName}! 💖
              </h2>

              <p className="text-xs text-pink-200/90 leading-relaxed px-4 italic font-['Dancing_Script'] text-base">
                "{wishText}"
              </p>
            </div>

            <div className="my-auto py-4">
              <img 
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80" 
                alt="Canvas memory" 
                className="w-full h-40 object-cover rounded-2xl border border-white/20"
              />
            </div>

            <div className="p-3 bg-pink-950/60 border border-pink-400/30 rounded-xl text-[11px] text-pink-200 text-left flex items-center justify-between">
              <span>💌 Sealed Love Letter from {senderName}</span>
              <span className="text-xs font-bold text-pink-400">Tap to open</span>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
