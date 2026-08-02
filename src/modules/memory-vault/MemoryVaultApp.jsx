import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import StoryBuilderStudio from './editor/StoryBuilderStudio';
import { ErrorBoundary } from './components/ErrorBoundary';
import { 
  DEFAULT_STORY_CONFIG, 
  VaultPage, 
  EnvelopePage, 
  ScrollLetterPage, 
  GalleryPage, 
  EndingPage, 
  FloatingParticles 
} from './components/StoryPages';

// ==========================================
// MAIN APPLICATION ENGINE (SAFE & ROBUST)
// ==========================================
export default function MemoryVaultApp({ initialAdminOpen = false, storyId }) {
  const [story, setStory] = useState(() => {
    try {
      const saved = localStorage.getItem('memory_vault_story');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.pages) && parsed.pages.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return DEFAULT_STORY_CONFIG;
  });

  const [currentPageId, setCurrentPageId] = useState(() => {
    return story?.pages?.[0]?.id || DEFAULT_STORY_CONFIG.pages[0].id;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(initialAdminOpen);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const activePages = story?.pages ?? DEFAULT_STORY_CONFIG.pages;
  const currentPageConfig = activePages.find((p) => p.id === currentPageId) || activePages[0] || DEFAULT_STORY_CONFIG.pages[0];

  const handleUpdateStory = (updatedStory) => {
    if (!updatedStory || !Array.isArray(updatedStory.pages) || updatedStory.pages.length === 0) {
      setStory(DEFAULT_STORY_CONFIG);
      return;
    }
    setStory(updatedStory);
    try {
      localStorage.setItem('memory_vault_story', JSON.stringify(updatedStory));
    } catch (e) {}
  };

  const renderPage = () => {
    if (!currentPageConfig) return <VaultPage config={DEFAULT_STORY_CONFIG.pages[0]} storyPin="1234" storyDecorations={{}} onNavigate={setCurrentPageId} />;

    switch (currentPageConfig.type) {
      case 'vault':
        return (
          <VaultPage
            key={currentPageConfig.id}
            config={currentPageConfig}
            storyPin={story?.pin || '1234'}
            storyDecorations={story?.decorations || {}}
            onNavigate={setCurrentPageId}
          />
        );
      case 'envelope':
        return <EnvelopePage key={currentPageConfig.id} config={currentPageConfig} onNavigate={setCurrentPageId} />;
      case 'letter':
        return <ScrollLetterPage key={currentPageConfig.id} config={currentPageConfig} onNavigate={setCurrentPageId} />;
      case 'gallery':
        return <GalleryPage key={currentPageConfig.id} config={currentPageConfig} onNavigate={setCurrentPageId} />;
      case 'ending':
        return <EndingPage key={currentPageConfig.id} config={currentPageConfig} onNavigate={setCurrentPageId} />;
      default:
        return <VaultPage key="fallback" config={currentPageConfig} storyPin={story?.pin || '1234'} storyDecorations={story?.decorations || {}} onNavigate={setCurrentPageId} />;
    }
  };

  if (isInitializing) {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', background: '#0F172A', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
        <span>Loading Story Builder...</span>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div style={styles.appContainer}>
        <header style={styles.header}>
          <div style={styles.headerRibbon}>
            📁 {story?.title || "FRIENDSHIP VAULT '24"}
          </div>
          <button style={styles.adminBtn} onClick={() => setIsAdminOpen(true)}>
            ⬅ Back to Editor 🛠️
          </button>
        </header>

        <FloatingParticles />

        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </main>

        <footer style={styles.footer}>
          {story?.footer || "Created with love, just for us."}
        </footer>

        {isAdminOpen && (
          <StoryBuilderStudio
            story={story ?? DEFAULT_STORY_CONFIG}
            onUpdateStory={(updated) => {
              handleUpdateStory(updated);
              if (!updated?.pages?.some((p) => p.id === currentPageId)) {
                setCurrentPageId(updated?.pages?.[0]?.id || 'page-login');
              }
            }}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

const styles = {
  appContainer: {
    position: 'relative',
    minHeight: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#f6f0df',
    backgroundImage: `
      radial-gradient(#e5d8be 15%, transparent 16%),
      radial-gradient(#e5d8be 15%, transparent 16%)
    `,
    backgroundSize: '30px 30px',
    backgroundPosition: '0 0, 15px 15px',
    color: '#2C1A0E',
    boxShadow: 'inset 0 0 100px rgba(160, 130, 90, 0.25)',
  },
  header: {
    position: 'fixed',
    top: 15,
    left: 20,
    right: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  headerRibbon: {
    background: '#fffdf7',
    border: '2.5px solid #2c1a0e',
    borderRadius: '8px',
    padding: '6px 16px',
    fontFamily: "'Impact', sans-serif",
    fontSize: '1rem',
    letterSpacing: '1px',
    boxShadow: '0 3px 0 #2c1a0e'
  },
  adminBtn: {
    background: '#10B981',
    color: '#FFF',
    border: '2.5px solid #2c1a0e',
    borderRadius: '20px',
    padding: '8px 16px',
    fontFamily: "'Patrick Hand', cursive",
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 0 #2c1a0e, 0 0 12px rgba(16, 185, 129, 0.4)',
    zIndex: 100
  },
  footer: {
    position: 'fixed',
    bottom: 12,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: "'Patrick Hand', cursive",
    fontSize: '0.95rem',
    fontWeight: 'bold',
    color: '#2c1a0e',
    opacity: 0.8,
    zIndex: 10,
  }
};
