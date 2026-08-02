// Memory Vault Studio - Main Story Engine Renderer

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStory } from '../context/StoryContext';
import { getPage } from './PageRegistry';
import ParticleEngine from '../core/ParticleEngine/ParticleEngine';
import styles from '../styles/story.module.css';

export default function StoryRenderer() {
  const { story, currentPageId, currentTheme, isMuted, setIsAdminOpen, toggleSound, navigateTo } = useStory();

  const currentPageConfig = story.pages?.find((p) => p.id === currentPageId) || story.pages?.[0];
  const PageComponent = getPage(currentPageConfig?.type);

  return (
    <div
      className={styles.viewport}
      style={{
        background: currentTheme.bg,
        color: currentTheme.text,
        fontFamily: currentTheme.fontFamily
      }}
    >
      {/* Background Paper Texture Overlay */}
      <div className={styles.paperTexture} />

      {/* Dynamic 60fps Particle Canvas */}
      <ParticleEngine type={currentTheme.particles} primaryColor={currentTheme.primary} />

      {/* Header Bar */}
      <header className={styles.headerBar}>
        <div className={styles.brandBadge}>
          <span>{currentTheme.icon || '📁'}</span>
          <span>{story.meta?.title || "MEMORY VAULT '24"}</span>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.iconBtn} onClick={toggleSound} title="Toggle Audio">
            {isMuted ? '🔇' : '🔊'}
          </button>

          <button className={styles.iconBtn} onClick={() => setIsAdminOpen(true)} title="Open Story Editor">
            ⚙️
          </button>
        </div>
      </header>

      {/* Dynamic Page Viewport */}
      <main style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <PageComponent
            key={currentPageConfig?.id || 'page-vault'}
            config={currentPageConfig}
            defaultPin={story.pin}
            onNavigate={navigateTo}
          />
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className={styles.footerBar}>
        {story.meta?.author ? `Created with love by ${story.meta.author}` : 'Created with love, just for us.'}
      </footer>
    </div>
  );
}
