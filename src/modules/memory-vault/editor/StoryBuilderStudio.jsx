// Memory Vault Studio - Adaptive Multi-Device Visual Story Builder Studio

import React, { useState } from 'react';
import { useBreakpoint } from './hooks/useBreakpoint';
import DesktopEditor from './DesktopEditor';
import TabletEditor from './TabletEditor';
import MobileEditor from './MobileEditor';
import { MediaLibraryModal } from '../components/MediaLibraryModal';
import { Sparkles, X } from 'lucide-react';

const VERSION_1_TEMPLATES = [
  { type: 'vault', label: '1. Vault Login', icon: '🔒', defaultTitle: 'ACCESSING OUR VAULT', defaultSubtitle: 'ENTER YOUR SECRET PIN (4 DIGITS)' },
  { type: 'envelope', label: '2. Wax Seal Envelope', icon: '✉️', defaultTitle: 'A MESSAGE FROM YOUR BESTIE', defaultSubtitle: 'Click wax seal to unroll' },
  { type: 'letter', label: '3. Letter Scroll', icon: '📜', defaultTitle: 'HAPPY FRIENDSHIP DAY!', defaultSubtitle: 'Written with love' },
  { type: 'gallery', label: '4. Memory Gallery', icon: '📸', defaultTitle: 'OUR PHOTO ALBUM', defaultSubtitle: 'Click photo to zoom' },
  { type: 'ending', label: '5. Ending Screen', icon: '❤️', defaultTitle: 'THANK YOU FOR BEING YOU', defaultSubtitle: 'Created with love' }
];

export default function StoryBuilderStudio({ story, onUpdateStory, onClose }) {
  const breakpoint = useBreakpoint();
  const [deviceMode, setDeviceMode] = useState(breakpoint);

  const activePages = Array.isArray(story?.pages) && story.pages.length > 0
    ? story.pages
    : VERSION_1_TEMPLATES.map((t) => ({ id: `page-${t.type}`, type: t.type, title: t.defaultTitle, subtitle: t.defaultSubtitle }));

  const [selectedPageId, setSelectedPageId] = useState(activePages[0]?.id || 'page-login');
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const selectedPage = activePages.find((p) => p.id === selectedPageId) || activePages[0];

  const updateStoryState = (newStoryData) => {
    onUpdateStory(newStoryData);
  };

  // Add Page
  const handleAddPage = (typeObj) => {
    const newId = `page-${typeObj.type}-${Date.now().toString().slice(-4)}`;
    const newPage = {
      id: newId,
      type: typeObj.type,
      title: typeObj.defaultTitle,
      subtitle: typeObj.defaultSubtitle,
      buttonText: 'NEXT PAGE →',
      next: activePages[0]?.id || 'page-login'
    };

    const updatedPages = [...activePages, newPage];
    updateStoryState({ ...story, pages: updatedPages });
    setSelectedPageId(newId);
  };

  // Duplicate Page
  const handleDuplicatePage = (pageId) => {
    const pageToDup = activePages.find((p) => p.id === pageId);
    if (!pageToDup) return;

    const dupId = `${pageId}-copy-${Math.floor(Math.random() * 100)}`;
    const dupPage = { ...pageToDup, id: dupId, title: `${pageToDup.title} (Copy)` };
    
    const index = activePages.findIndex((p) => p.id === pageId);
    const updatedPages = [...activePages];
    updatedPages.splice(index + 1, 0, dupPage);
    
    updateStoryState({ ...story, pages: updatedPages });
    setSelectedPageId(dupId);
  };

  // Delete Page
  const handleDeletePage = (pageId) => {
    if (activePages.length <= 1) return;
    const updatedPages = activePages.filter((p) => p.id !== pageId);
    updateStoryState({ ...story, pages: updatedPages });
    if (selectedPageId === pageId) {
      setSelectedPageId(updatedPages[0]?.id || 'page-login');
    }
  };

  // Move Page Order
  const handleMovePage = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= activePages.length) return;

    const updatedPages = [...activePages];
    const [moved] = updatedPages.splice(index, 1);
    updatedPages.splice(targetIndex, 0, moved);

    updateStoryState({ ...story, pages: updatedPages });
  };

  // Update Page Field
  const handlePageFieldChange = (field, value) => {
    const updatedPages = activePages.map((p) => {
      if (p.id === selectedPageId) {
        return { ...p, [field]: value };
      }
      return p;
    });
    updateStoryState({ ...story, pages: updatedPages });
  };

  // Update Decoration Field
  const handleDecorationChange = (field, value) => {
    const updatedDecorations = {
      ...(story.decorations || {}),
      [field]: value
    };
    updateStoryState({ ...story, decorations: updatedDecorations });
  };

  // AI Story Generator
  const handleGenerateAiStory = () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAi(true);

    setTimeout(() => {
      const generatedTheme = aiPrompt.toLowerCase().includes('love') || aiPrompt.toLowerCase().includes('anniversary') ? 'love' : 'birthday';
      const aiStory = {
        ...story,
        title: `${aiPrompt.toUpperCase()} VAULT`,
        theme: generatedTheme,
        pages: [
          { id: 'page-login', type: 'vault', title: 'SECRET MEMORY VAULT', subtitle: 'ENTER PIN (1234)', buttonText: 'UNLOCK MEMORIES', next: 'page-envelope' },
          { id: 'page-envelope', type: 'envelope', ribbonText: 'AI Special Message', recipient: 'TO: MY FAVORITE PERSON', subtext: `Story generated for: "${aiPrompt}"`, buttonText: 'OPEN MESSAGE →', next: 'page-letter' },
          { id: 'page-letter', type: 'letter', title: 'SPECIAL MOMENTS', section1Title: 'OUR JOURNEY', section1Text: 'Thank you for every smile and memory we share!', bulletPoints: ['First Day', 'Late Night Talks', 'Endless Smiles'], buttonText: 'VIEW GALLERY →', next: 'page-gallery' },
          { id: 'page-gallery', type: 'gallery', title: 'OUR PHOTO ALBUM', subtitle: 'Click photo to zoom', images: [{ id: 'g1', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80', caption: 'Sweet Memories', rotation: -3 }], buttonText: 'GO TO FINALE →', next: 'page-ending' },
          { id: 'page-ending', type: 'ending', title: 'FOREVER & ALWAYS ❤️', message: 'Created with Memory Vault Studio AI', buttonText: 'REPLAY STORY ↻', next: 'page-login' }
        ]
      };

      updateStoryState(aiStory);
      setIsGeneratingAi(false);
      setShowAiModal(false);
    }, 1000);
  };

  const sharedProps = {
    story,
    selectedPage,
    selectedPageId,
    setSelectedPageId,
    activePages,
    deviceMode,
    setDeviceMode,
    onUpdateStory: updateStoryState,
    onAddPage: handleAddPage,
    onDuplicatePage: handleDuplicatePage,
    onDeletePage: handleDeletePage,
    onMovePage: handleMovePage,
    onPageFieldChange: handlePageFieldChange,
    onDecorationChange: handleDecorationChange,
    onClose,
    onOpenMediaLibrary: () => setShowMediaLibrary(true),
    onOpenAiModal: () => setShowAiModal(true)
  };

  return (
    <>
      {breakpoint === 'mobile' && <MobileEditor {...sharedProps} />}
      {breakpoint === 'tablet' && <TabletEditor {...sharedProps} />}
      {breakpoint === 'desktop' && <DesktopEditor {...sharedProps} />}

      {/* Media Library Grid Modal */}
      {showMediaLibrary && (
        <MediaLibraryModal
          isOpen={showMediaLibrary}
          onClose={() => setShowMediaLibrary(false)}
          onSelectAsset={(assetId) => {
            setShowMediaLibrary(false);
          }}
        />
      )}

      {/* AI Story Generator Modal */}
      {showAiModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 350, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#1E293B', border: '2px solid #6366F1', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '420px', color: '#FFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles className="w-5 h-5" style={{ color: '#818CF8' }} />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>AI Story Generator</h3>
              </div>
              <button onClick={() => setShowAiModal(false)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. A romantic anniversary story for Rohan and Simran..."
              style={{ width: '100%', height: '100px', background: '#0F172A', border: '1px solid #334155', borderRadius: '10px', padding: '12px', color: '#FFF', fontSize: '0.9rem', marginBottom: '16px', boxSizing: 'border-box' }}
            />

            <button
              onClick={handleGenerateAiStory}
              disabled={isGeneratingAi || !aiPrompt.trim()}
              style={{ width: '100%', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', border: 'none', borderRadius: '10px', padding: '12px', color: '#FFF', fontSize: '0.95rem', fontWeight: 800, cursor: 'pointer', opacity: isGeneratingAi ? 0.6 : 1 }}
            >
              {isGeneratingAi ? 'Generating Story...' : '✨ Generate Story'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
