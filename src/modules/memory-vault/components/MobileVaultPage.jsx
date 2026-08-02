import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PolaroidCard, WashiTape, HandshakeCalculatorSVG, soundFx } from './StoryPages';
import '../styles/MobileVaultPage.css';

export default function MobileVaultPage({ config = {}, storyPin, storyDecorations = {}, onNavigate, onElementClick, isInsideStudio = false }) {
  const [pin, setPin] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const targetPin = config?.pin || storyPin || '1234';
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : false;

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate([15]); } catch (e) {}
    }
  };

  const handleKeyPress = (num) => {
    soundFx.playClick();
    triggerHaptic();
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === targetPin) {
          soundFx.playSuccess();
          setIsUnlocking(true);
          setTimeout(() => onNavigate(config?.next || 'page-envelope'), 350);
        }
      }
    }
  };

  const handleClear = () => {
    soundFx.playClick();
    triggerHaptic();
    setPin('');
  };

  const handleEnter = () => {
    triggerHaptic();
    if (pin === targetPin) {
      soundFx.playSuccess();
      setIsUnlocking(true);
      onNavigate(config?.next || 'page-envelope');
    } else {
      soundFx.playClick();
      setPin('');
    }
  };

  const mainMobileContent = (
    <div className={`mobile-vault-container ${isInsideStudio ? 'inside-studio-canvas' : ''}`}>
      {/* Background Animated Gradient */}
      <div className={`bg-gradient-animated ${isInsideStudio ? 'inside-studio-canvas' : ''}`} />
      <div className={`bg-paper-texture ${isInsideStudio ? 'inside-studio-canvas' : ''}`} />

      {/* Floating Ambient Particles */}
      <div className={`floating-particles-layer ${isInsideStudio ? 'inside-studio-canvas' : ''}`}>
        <span className="particle-item h1">❤️</span>
        <span className="particle-item h2">💖</span>
        <span className="particle-item s1">✨</span>
        <span className="particle-item s2">🌟</span>
      </div>

      <main className="mobile-vault-content">
        {/* Header / Top Section */}
        <header className="mobile-header">
          <h1 className="mobile-logo">FRIENDSHIP VAULT '24</h1>
          <div className="notebook-icon" aria-label="Notebook Icon">📝</div>
        </header>

        {/* Central Card Composition Frame */}
        <div className="mobile-card-wrapper">
          {/* Layered Scrapbook Papers Behind Main Card */}
          <div className="scrapbook-paper paper-layer-2" />
          <div className="scrapbook-paper paper-layer-1" />

          {/* Main Paper Card */}
          <section className="main-paper-card">
            <div className="washi-tape-top" />

            <h1
              onClick={() => onElementClick && onElementClick('title')}
              className="card-title"
              style={{ cursor: 'pointer' }}
            >
              {config?.title || 'ACCESSING OUR VAULT'}
            </h1>

            <p
              onClick={() => onElementClick && onElementClick('subtitle')}
              className="card-subtitle"
              style={{ cursor: 'pointer' }}
            >
              {config?.subtitle || 'ENTER YOUR SECRET PIN (4 DIGITS)'}
            </p>

            <HandshakeCalculatorSVG
              pin={pin}
              onKeyPress={handleKeyPress}
              onClear={handleClear}
              onEnter={handleEnter}
            />

            <div style={{ position: 'relative', marginTop: '14px' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleEnter}
                className="unlock-btn"
              >
                {isUnlocking ? 'UNLOCKING...' : (config?.buttonText || 'UNLOCK MEMORIES')}
              </motion.button>
            </div>
          </section>
        </div>

        {/* Bottom Polaroids & Notes Grid Section */}
        <section className="mobile-decorations-grid">
          {/* Row 1: Top Polaroids */}
          <div className="polaroid-row">
            <PolaroidCard
              label={storyDecorations?.polaroid1Label || "Our Road Trip '22"}
              imageUrl={storyDecorations?.polaroid1Image}
              style={{ position: 'relative', width: '135px' }}
              angle={storyDecorations?.polaroid1Angle || -6}
              tapeColor={storyDecorations?.polaroid1Tape || "#f1b581"}
              onClick={() => onElementClick && onElementClick('polaroid1')}
            />
            <PolaroidCard
              label={storyDecorations?.polaroid2Label || "Inside Jokes"}
              imageUrl={storyDecorations?.polaroid2Image}
              style={{ position: 'relative', width: '135px' }}
              angle={storyDecorations?.polaroid2Angle || 6}
              tapeColor={storyDecorations?.polaroid2Tape || "#aed48f"}
              onClick={() => onElementClick && onElementClick('polaroid2')}
            />
          </div>

          {/* Row 2: Sticky Note secret phrase */}
          <div
            onClick={() => onElementClick && onElementClick('note2')}
            className="sticky-note-box"
            style={{ transform: 'rotate(3deg)', width: '140px' }}
          >
            <WashiTape color="#f2bd92" angle={-2} style={{ top: '-8px', left: '30px', width: '50px' }} />
            <p style={{ margin: '4px 0 0 0' }}>
              {storyDecorations?.note2Text || "secret phras!..."}
            </p>
          </div>

          {/* Row 3: Bottom Polaroids & Sticky Note */}
          <div className="polaroid-row" style={{ alignItems: 'flex-end' }}>
            <PolaroidCard
              label={storyDecorations?.polaroid3Label || "Memories"}
              imageUrl={storyDecorations?.polaroid3Image}
              style={{ position: 'relative', width: '135px' }}
              angle={storyDecorations?.polaroid3Angle || -8}
              tapeColor={storyDecorations?.polaroid3Tape || "#e89e9e"}
              onClick={() => onElementClick && onElementClick('polaroid3')}
            />
            <PolaroidCard
              label={storyDecorations?.polaroid4Label || "Besties '24"}
              imageUrl={storyDecorations?.polaroid4Image}
              style={{ position: 'relative', width: '135px' }}
              angle={storyDecorations?.polaroid4Angle || 8}
              tapeColor={storyDecorations?.polaroid4Tape || "#85cbcf"}
              onClick={() => onElementClick && onElementClick('polaroid4')}
            />
          </div>

          <p className="mobile-footer-text">Created with love, just for us.</p>
        </section>
      </main>
    </div>
  );

  if (isInsideStudio) {
    return mainMobileContent;
  }

  if (isDesktop) {
    return (
      <div className="desktop-phone-wrapper">
        <div className="iphone-mockup-device">
          {mainMobileContent}
        </div>
      </div>
    );
  }

  return mainMobileContent;
}
