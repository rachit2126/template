import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PolaroidCard, WashiTape, HandshakeCalculatorSVG, soundFx } from './StoryPages';

export default function DesktopVaultPage({ config = {}, storyPin, storyDecorations = {}, onNavigate, onElementClick }) {
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
        maxWidth: '900px',
        minHeight: '620px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        padding: '20px',
        boxSizing: 'border-box'
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <PolaroidCard
        label={storyDecorations?.polaroid1Label || "Road Trip '22"}
        imageUrl={storyDecorations?.polaroid1Image}
        style={{ left: '50px', top: '70px' }}
        angle={storyDecorations?.polaroid1Angle || -10}
        tapeColor={storyDecorations?.polaroid1Tape || "#f1b581"}
        tapeAngle={-5}
        onClick={() => onElementClick && onElementClick('polaroid1')}
      />

      <PolaroidCard
        label={storyDecorations?.polaroid2Label || "Inside Jokes"}
        imageUrl={storyDecorations?.polaroid2Image}
        style={{ right: '50px', top: '50px' }}
        angle={storyDecorations?.polaroid2Angle || 8}
        tapeColor={storyDecorations?.polaroid2Tape || "#aed48f"}
        tapeAngle={4}
        onClick={() => onElementClick && onElementClick('polaroid2')}
      />

      {/* Main Paper Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{
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
        }}
      >
        <WashiTape color="#f3d79e" angle={0} style={{ top: '-12px', left: '50%', transform: 'translateX(-50%)', width: '110px', height: '22px' }} />

        <h1
          onClick={() => onElementClick && onElementClick('title')}
          style={{
            fontFamily: "'Impact', 'Fredoka One', sans-serif",
            fontSize: '2rem',
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
            fontSize: '0.95rem',
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
              minHeight: '56px',
              background: '#8ec098',
              border: '2.5px solid #2c1a0e',
              borderRadius: '25px',
              padding: '12px 0',
              fontFamily: "'Impact', 'Fredoka One', sans-serif",
              fontSize: '1.15rem',
              letterSpacing: '1.5px',
              color: '#2c1a0e',
              cursor: 'pointer',
              boxShadow: '0 4px 0 #2c1a0e, 0 0 16px rgba(142, 192, 152, 0.45)',
              transition: 'box-shadow 0.3s ease'
            }}
          >
            {isUnlocking ? 'UNLOCKING...' : (config?.buttonText || 'UNLOCK MEMORIES')}
          </motion.button>
        </div>
      </motion.div>

      <PolaroidCard
        label={storyDecorations?.polaroid3Label || "Memories"}
        imageUrl={storyDecorations?.polaroid3Image}
        style={{ left: '40px', bottom: '-20px' }}
        angle={storyDecorations?.polaroid3Angle || 12}
        tapeColor={storyDecorations?.polaroid3Tape || "#e89e9e"}
        tapeAngle={-8}
        onClick={() => onElementClick && onElementClick('polaroid3')}
      />

      <PolaroidCard
        label={storyDecorations?.polaroid4Label || "Besties '24"}
        imageUrl={storyDecorations?.polaroid4Image}
        style={{ right: '40px', bottom: '-40px' }}
        angle={storyDecorations?.polaroid4Angle || -14}
        tapeColor={storyDecorations?.polaroid4Tape || "#85cbcf"}
        tapeAngle={6}
        onClick={() => onElementClick && onElementClick('polaroid4')}
      />
    </motion.div>
  );
}
