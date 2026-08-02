import React, { useState } from 'react';
import { ArrowLeft, Layers, Image as ImageIcon, Edit3, Palette, Settings, Check, Sparkles } from 'lucide-react';
import BottomSheet from './components/BottomSheet';
import PagesPanel from './components/PagesPanel';
import Inspector from './components/Inspector';
import AssetsPanel from './components/AssetsPanel';
import ThemePanel from './components/ThemePanel';
import MobileVaultPage from '../components/MobileVaultPage';
import { EnvelopePage, ScrollLetterPage, GalleryPage, EndingPage } from '../components/StoryPages';

export default function MobileEditor({
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
  const [activeSheet, setActiveSheet] = useState(null); // pages, assets, content, theme, settings

  const renderMobilePageContent = () => {
    if (!selectedPage) return null;
    switch (selectedPage.type) {
      case 'vault':
        return (
          <MobileVaultPage
            config={selectedPage}
            storyPin={story?.pin || '1234'}
            storyDecorations={story?.decorations || {}}
            onNavigate={(nextId) => {
              const target = activePages.find((p) => p.id === nextId);
              if (target) setSelectedPageId(target.id);
            }}
          />
        );
      case 'envelope':
        return <EnvelopePage config={selectedPage} onNavigate={() => {}} />;
      case 'letter':
        return <ScrollLetterPage config={selectedPage} onNavigate={() => {}} />;
      case 'gallery':
        return <GalleryPage config={selectedPage} onNavigate={() => {}} />;
      case 'ending':
        return <EndingPage config={selectedPage} onNavigate={() => {}} />;
      default:
        return (
          <MobileVaultPage
            config={selectedPage}
            storyPin={story?.pin || '1234'}
            storyDecorations={story?.decorations || {}}
            onNavigate={() => {}}
          />
        );
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#0F172A', color: '#FFF', display: 'flex', flexDirection: 'column', height: '100dvh', paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)', fontFamily: 'sans-serif' }}>
      {/* Top App Bar */}
      <header style={{ height: '52px', background: '#1E293B', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', zIndex: 10 }}>
        <button onClick={onClose} style={{ background: '#334155', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '160px' }}>
          {story.title || 'Memory Vault'}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={onOpenAiModal} style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', border: 'none', borderRadius: '18px', padding: '6px 10px', color: '#FFF', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles className="w-3.5 h-3.5" /> AI
          </button>
          <button onClick={onClose} style={{ background: '#10B981', border: 'none', borderRadius: '18px', padding: '6px 12px', color: '#FFF', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check className="w-3.5 h-3.5" /> Save
          </button>
        </div>
      </header>

      {/* Main Full-Screen Canvas Area */}
      <main style={{ flex: 1, overflowY: 'auto', position: 'relative', background: '#f6f0df' }}>
        {renderMobilePageContent()}
      </main>

      {/* Bottom Navigation Bar */}
      <nav style={{ height: '60px', background: '#1E293B', borderTop: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px', zIndex: 20 }}>
        <button
          onClick={() => setActiveSheet('pages')}
          style={{ background: 'none', border: 'none', color: activeSheet === 'pages' ? '#10B981' : '#94A3B8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', minWidth: '48px', minHeight: '48px', justifyContent: 'center' }}
        >
          <Layers className="w-5 h-5" />
          <span style={{ fontSize: '0.65rem', fontWeight: 700 }}>Pages</span>
        </button>

        <button
          onClick={() => setActiveSheet('content')}
          style={{ background: 'none', border: 'none', color: activeSheet === 'content' ? '#10B981' : '#94A3B8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', minWidth: '48px', minHeight: '48px', justifyContent: 'center' }}
        >
          <Edit3 className="w-5 h-5" />
          <span style={{ fontSize: '0.65rem', fontWeight: 700 }}>Content</span>
        </button>

        <button
          onClick={() => setActiveSheet('assets')}
          style={{ background: 'none', border: 'none', color: activeSheet === 'assets' ? '#10B981' : '#94A3B8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', minWidth: '48px', minHeight: '48px', justifyContent: 'center' }}
        >
          <ImageIcon className="w-5 h-5" />
          <span style={{ fontSize: '0.65rem', fontWeight: 700 }}>Assets</span>
        </button>

        <button
          onClick={() => setActiveSheet('theme')}
          style={{ background: 'none', border: 'none', color: activeSheet === 'theme' ? '#10B981' : '#94A3B8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', minWidth: '48px', minHeight: '48px', justifyContent: 'center' }}
        >
          <Palette className="w-5 h-5" />
          <span style={{ fontSize: '0.65rem', fontWeight: 700 }}>Theme</span>
        </button>
      </nav>

      {/* Draggable Bottom Sheets */}
      <BottomSheet
        isOpen={activeSheet === 'pages'}
        onClose={() => setActiveSheet(null)}
        title="Page Manager"
      >
        <PagesPanel
          pages={activePages}
          selectedPageId={selectedPageId}
          onSelectPage={(id) => { setSelectedPageId(id); setActiveSheet(null); }}
          onAddPage={onAddPage}
          onDuplicatePage={onDuplicatePage}
          onDeletePage={onDeletePage}
          onMovePage={onMovePage}
        />
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === 'content'}
        onClose={() => setActiveSheet(null)}
        title="Edit Page Content"
      >
        <Inspector
          selectedPage={selectedPage}
          onPageFieldChange={onPageFieldChange}
          storyTitle={story.title}
          onTitleChange={(val) => onUpdateStory({ ...story, title: val })}
          storyPin={story.pin}
          onPinChange={(val) => onUpdateStory({ ...story, pin: val })}
        />
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === 'assets'}
        onClose={() => setActiveSheet(null)}
        title="Scrapbook Assets"
      >
        <AssetsPanel
          decorations={story.decorations || {}}
          onDecorationChange={onDecorationChange}
          onOpenMediaLibrary={onOpenMediaLibrary}
        />
      </BottomSheet>

      <BottomSheet
        isOpen={activeSheet === 'theme'}
        onClose={() => setActiveSheet(null)}
        title="Preset Themes"
      >
        <ThemePanel
          currentTheme={story.theme || 'friendship'}
          onSelectTheme={(themeId) => onUpdateStory({ ...story, theme: themeId })}
        />
      </BottomSheet>
    </div>
  );
}
