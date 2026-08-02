import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PolaroidCard, WashiTape, HandshakeCalculatorSVG, soundFx } from './StoryPages';

export default function TabletVaultPage({ config = {}, storyPin, storyDecorations = {}, onNavigate, onElementClick }) {
  const [pin, setPin] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const targetPin = config?.pin || storyPin || '1234';

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

  return (
    <motion.div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '720px',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        padding: '16px',
        boxSizing: 'border-box'
      }}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
    >
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ fontFamily: "'Impact', sans-serif", fontSize: '1.8rem', color: '#1e293b', margin: '0 0 4px 0', letterSpacing: '1px' }}>
          FRIENDSHIP VAULT '24
        </h1>
        <div style={{ fontSize: '1.5rem' }}>📝</div>
      </div>

      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <PolaroidCard
          label={storyDecorations?.polaroid1Label || "Our Road Trip '22"}
          imageUrl={storyDecorations?.polaroid1Image}
          style={{ position: 'absolute', left: '10px', top: '20px' }}
          angle={storyDecorations?.polaroid1Angle || -8}
          tapeColor={storyDecorations?.polaroid1Tape || "#f1b581"}
          onClick={() => onElementClick && onElementClick('polaroid1')}
        />

        <PolaroidCard
          label={storyDecorations?.polaroid2Label || "Inside Jokes"}
          imageUrl={storyDecorations?.polaroid2Image}
          style={{ position: 'absolute', right: '10px', top: '10px' }}
          angle={storyDecorations?.polaroid2Angle || 8}
          tapeColor={storyDecorations?.polaroid2Tape || "#aed48f"}
          onClick={() => onElementClick && onElementClick('polaroid2')}
        />

        {/* Center Paper Card */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '410px',
          background: '#fffdf7',
          border: '2.5px solid #2c1a0e',
          borderRadius: '16px',
          padding: '24px 20px',
          textAlign: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          zIndex: 5,
          boxSizing: 'border-box'
        }}>
          <WashiTape color="#f3d79e" angle={0} style={{ top: '-12px', left: '50%', transform: 'translateX(-50%)', width: '110px', height: '22px' }} />

          <h1
            onClick={() => onElementClick && onElementClick('title')}
            style={{
              fontFamily: "'Impact', 'Fredoka One', sans-serif",
              fontSize: '1.8rem',
              letterSpacing: '1px',
              color: '#2c1a0e',
              margin: '0 0 2px 0',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            {config?.title || 'ACCESSING OUR VAULT'}
          </h1>

          <p
            onClick={() => onElementClick && onElementClick('subtitle')}
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '0.9rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              color: '#2c1a0e',
              margin: '0 0 10px 0',
              cursor: 'pointer'
            }}
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
              style={{
                width: '100%',
                minHeight: '52px',
                background: '#8ec098',
                border: '2.5px solid #2c1a0e',
                borderRadius: '25px',
                padding: '10px 0',
                fontFamily: "'Impact', 'Fredoka One', sans-serif",
                fontSize: '1.1rem',
                letterSpacing: '1.5px',
                color: '#2c1a0e',
                cursor: 'pointer',
                boxShadow: '0 4px 0 #2c1a0e, 0 0 14px rgba(142, 192, 152, 0.4)'
              }}
            >
              {isUnlocking ? 'UNLOCKING...' : (config?.buttonText || 'UNLOCK MEMORIES')}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
