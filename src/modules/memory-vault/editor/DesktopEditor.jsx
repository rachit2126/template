import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Sparkles, RotateCcw, RotateCw, Check, ArrowLeft, ExternalLink } from 'lucide-react';
import PagesPanel from './components/PagesPanel';
import PreviewCanvas from './components/PreviewCanvas';
import Inspector from './components/Inspector';
import AssetsPanel from './components/AssetsPanel';
import ThemePanel from './components/ThemePanel';

export default function DesktopEditor({
  story,
  selectedPage,
  selectedPageId,
  setSelectedPageId,
  activePages,
  deviceMode,
  setDeviceMode,
  onUpdateStory,
  onAddPage,
  onDuplicatePage,
  onDeletePage,
  onMovePage,
  onPageFieldChange,
  onDecorationChange,
  onClose,
  onOpenMediaLibrary,
  onOpenAiModal
}) {
  const [activeTab, setActiveTab] = useState('decorations'); // decorations, content, theme

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#0F172A', color: '#FFF', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      {/* Top Studio Bar */}
      <header style={{ height: '56px', background: '#1E293B', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onClose} style={{ background: '#334155', border: 'none', borderRadius: '6px', padding: '6px 12px', color: '#FFF', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft className="w-4 h-4" /> Exit
          </button>
          <span style={{ fontSize: '0.95rem', fontWeight: 900, background: 'linear-gradient(90deg, #F43F5E, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            MEMORY VAULT STUDIO (DESKTOP)
          </span>
        </div>

        {/* Center Device Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', background: '#0F172A', padding: '3px', borderRadius: '8px', border: '1px solid #334155' }}>
            <button onClick={() => setDeviceMode('desktop')} style={{ background: deviceMode === 'desktop' ? '#3B82F6' : 'transparent', border: 'none', borderRadius: '6px', padding: '6px 12px', color: '#FFF', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Monitor className="w-4 h-4" /> Desktop
            </button>
            <button onClick={() => setDeviceMode('tablet')} style={{ background: deviceMode === 'tablet' ? '#3B82F6' : 'transparent', border: 'none', borderRadius: '6px', padding: '6px 12px', color: '#FFF', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tablet className="w-4 h-4" /> Tablet
            </button>
            <button onClick={() => setDeviceMode('mobile')} style={{ background: deviceMode === 'mobile' ? '#3B82F6' : 'transparent', border: 'none', borderRadius: '6px', padding: '6px 12px', color: '#FFF', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Smartphone className="w-4 h-4" /> Mobile
            </button>
          </div>
          <button onClick={() => window.open('/memory-vault', '_blank')} style={{ background: '#334155', border: 'none', borderRadius: '6px', padding: '6px 10px', color: '#94A3B8', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ExternalLink className="w-3.5 h-3.5" /> Fullscreen
          </button>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onOpenAiModal} style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', border: 'none', borderRadius: '6px', padding: '6px 14px', color: '#FFF', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles className="w-4 h-4" /> AI Story Generator
          </button>
          <button onClick={onClose} style={{ background: '#10B981', border: 'none', borderRadius: '6px', padding: '6px 16px', color: '#FFF', fontSize: '0.85rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Check className="w-4 h-4" /> Save & Exit
          </button>
        </div>
      </header>

      {/* 3 Column Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Pages Sidebar */}
        <aside style={{ width: '280px', background: '#1E293B', borderRight: '1px solid #334155', padding: '16px', overflowY: 'auto' }}>
          <PagesPanel
            pages={activePages}
            selectedPageId={selectedPageId}
            onSelectPage={setSelectedPageId}
            onAddPage={onAddPage}
            onDuplicatePage={onDuplicatePage}
            onDeletePage={onDeletePage}
            onMovePage={onMovePage}
          />
        </aside>

        {/* Center Canvas */}
        <main style={{ flex: 1, background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <PreviewCanvas
            selectedPage={selectedPage}
            story={story}
            onNavigate={(nextId) => {
              const target = activePages.find((p) => p.id === nextId);
              if (target) setSelectedPageId(target.id);
            }}
            deviceMode={deviceMode}
          />
        </main>

        {/* Right Inspector Sidebar */}
        <aside style={{ width: '320px', background: '#1E293B', borderLeft: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
            <button onClick={() => setActiveTab('decorations')} style={{ flex: 1, padding: '12px', background: activeTab === 'decorations' ? '#0F172A' : 'transparent', border: 'none', color: activeTab === 'decorations' ? '#10B981' : '#94A3B8', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}>
              🖼️ ASSETS
            </button>
            <button onClick={() => setActiveTab('content')} style={{ flex: 1, padding: '12px', background: activeTab === 'content' ? '#0F172A' : 'transparent', border: 'none', color: activeTab === 'content' ? '#10B981' : '#94A3B8', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}>
              📝 CONTENT
            </button>
            <button onClick={() => setActiveTab('theme')} style={{ flex: 1, padding: '12px', background: activeTab === 'theme' ? '#0F172A' : 'transparent', border: 'none', color: activeTab === 'theme' ? '#10B981' : '#94A3B8', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer' }}>
              🎨 THEME
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            {activeTab === 'decorations' && (
              <AssetsPanel
                decorations={story.decorations || {}}
                onDecorationChange={onDecorationChange}
                onOpenMediaLibrary={onOpenMediaLibrary}
              />
            )}
            {activeTab === 'content' && (
              <Inspector
                selectedPage={selectedPage}
                onPageFieldChange={onPageFieldChange}
                storyTitle={story.title}
                onTitleChange={(val) => onUpdateStory({ ...story, title: val })}
                storyPin={story.pin}
                onPinChange={(val) => onUpdateStory({ ...story, pin: val })}
              />
            )}
            {activeTab === 'theme' && (
              <ThemePanel
                currentTheme={story.theme || 'friendship'}
                onSelectTheme={(themeId) => onUpdateStory({ ...story, theme: themeId })}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
