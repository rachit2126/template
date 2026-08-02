import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Check, Layers, Image as ImageIcon, Edit3, Palette } from 'lucide-react';
import PagesPanel from './components/PagesPanel';
import PreviewCanvas from './components/PreviewCanvas';
import Inspector from './components/Inspector';
import AssetsPanel from './components/AssetsPanel';
import ThemePanel from './components/ThemePanel';

export default function TabletEditor({
  story,
  selectedPage,
  selectedPageId,
  setSelectedPageId,
  activePages,
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
  const [activeTab, setActiveTab] = useState('content');
  const [showPagesDrawer, setShowPagesDrawer] = useState(false);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#0F172A', color: '#FFF', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      {/* Top Bar */}
      <header style={{ height: '52px', background: '#1E293B', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onClose} style={{ background: '#334155', border: 'none', borderRadius: '6px', padding: '6px 10px', color: '#FFF', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft className="w-4 h-4" /> Exit
          </button>
          <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#10B981' }}>
            STUDIO (TABLET)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => setShowPagesDrawer(!showPagesDrawer)} style={{ background: showPagesDrawer ? '#3B82F6' : '#334155', border: 'none', borderRadius: '6px', padding: '6px 12px', color: '#FFF', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers className="w-4 h-4" /> Pages ({activePages.length})
          </button>
          <button onClick={onOpenAiModal} style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', border: 'none', borderRadius: '6px', padding: '6px 12px', color: '#FFF', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles className="w-4 h-4" /> AI Generator
          </button>
          <button onClick={onClose} style={{ background: '#10B981', border: 'none', borderRadius: '6px', padding: '6px 14px', color: '#FFF', fontSize: '0.85rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Check className="w-4 h-4" /> Done
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {/* Collapsible Pages Drawer */}
        {showPagesDrawer && (
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px', background: '#1E293B', borderRight: '2px solid #334155', zIndex: 50, padding: '16px', overflowY: 'auto' }}>
            <PagesPanel
              pages={activePages}
              selectedPageId={selectedPageId}
              onSelectPage={(id) => { setSelectedPageId(id); setShowPagesDrawer(false); }}
              onAddPage={onAddPage}
              onDuplicatePage={onDuplicatePage}
              onDeletePage={onDeletePage}
              onMovePage={onMovePage}
            />
          </div>
        )}

        {/* 70% Live Canvas */}
        <div style={{ height: '65%', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <PreviewCanvas
            selectedPage={selectedPage}
            story={story}
            onNavigate={(nextId) => {
              const target = activePages.find((p) => p.id === nextId);
              if (target) setSelectedPageId(target.id);
            }}
            deviceMode="tablet"
          />
        </div>

        {/* 35% Bottom Inspector */}
        <div style={{ height: '35%', background: '#1E293B', borderTop: '2px solid #334155', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #334155' }}>
            <button onClick={() => setActiveTab('content')} style={{ flex: 1, padding: '10px', background: activeTab === 'content' ? '#0F172A' : 'transparent', border: 'none', color: activeTab === 'content' ? '#10B981' : '#94A3B8', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Edit3 className="w-4 h-4" /> CONTENT
            </button>
            <button onClick={() => setActiveTab('decorations')} style={{ flex: 1, padding: '10px', background: activeTab === 'decorations' ? '#0F172A' : 'transparent', border: 'none', color: activeTab === 'decorations' ? '#10B981' : '#94A3B8', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ImageIcon className="w-4 h-4" /> ASSETS
            </button>
            <button onClick={() => setActiveTab('theme')} style={{ flex: 1, padding: '10px', background: activeTab === 'theme' ? '#0F172A' : 'transparent', border: 'none', color: activeTab === 'theme' ? '#10B981' : '#94A3B8', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Palette className="w-4 h-4" /> THEME
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
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
            {activeTab === 'decorations' && (
              <AssetsPanel
                decorations={story.decorations || {}}
                onDecorationChange={onDecorationChange}
                onOpenMediaLibrary={onOpenMediaLibrary}
              />
            )}
            {activeTab === 'theme' && (
              <ThemePanel
                currentTheme={story.theme || 'friendship'}
                onSelectTheme={(themeId) => onUpdateStory({ ...story, theme: themeId })}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
