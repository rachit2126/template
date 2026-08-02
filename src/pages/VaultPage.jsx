import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function VaultPage({ config, onNavigate, defaultPin = '1234' }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const targetPin = config.pin || defaultPin;

  const handleNumClick = (num) => {
    soundFx.playKeypad();
    if (pin.length < 4) {
      setPin((prev) => prev + num);
      setError(false);
    }
  };

  const handleClear = () => {
    soundFx.playClick();
    setPin('');
    setError(false);
  };

  const handleUnlock = () => {
    if (pin === targetPin) {
      soundFx.playDoorClang();
      soundFx.playSuccess();
      onNavigate(config.next);
    } else {
      soundFx.playClick();
      setError(true);
      setPin('');
    }
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Side Decorative Scrap Polaroids */}
      <div className={styles.scrapPolaroid} style={{ top: -20, left: -45, transform: 'rotate(-8deg)' }}>
        <div className={styles.washiTape} />
        <div className={styles.polaroidPhotoArea}>👥</div>
        <p className={styles.polaroidCaption}>Road Trip '22</p>
      </div>

      <div className={styles.scrapPolaroid} style={{ top: 20, right: -45, transform: 'rotate(6deg)' }}>
        <div className={styles.washiTape} style={{ background: '#FFCCD5' }} />
        <div className={styles.polaroidPhotoArea}>💖</div>
        <p className={styles.polaroidCaption}>Inside Jokes</p>
      </div>

      <div
        className={styles.vaultCard}
        style={{
          animation: error ? 'shake 0.4s ease-in-out' : 'none'
        }}
      >
        <h2 style={{ fontSize: '1.8rem', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {config.title}
        </h2>
        <p style={{ fontSize: '0.85rem', opacity: 0.75, margin: '4px 0 14px 0', textTransform: 'uppercase' }}>
          {config.subtitle}
        </p>

        {/* Handshake Illustration */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '2.5rem', marginBottom: '12px' }}>
          <span style={{ color: '#F8D48E', fontSize: '1.2rem' }}>✦</span>
          <span>🤝</span>
          <span style={{ color: '#F8D48E', fontSize: '1.2rem' }}>✦</span>
        </div>

        {/* Keypad Display Box */}
        <div style={{ background: '#FDF8EF', border: '2px solid #2C1A0E', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '6px', opacity: 0.8 }}>
            PIN CODE
          </div>
          <div className={styles.keypadDisplay} style={{ margin: 0 }}>
            {[0, 1, 2, 3].map((idx) => (
              <span key={idx} style={{ fontSize: '1.4rem', color: '#2C1A0E', width: '20px' }}>
                {pin[idx] ? '●' : '—'}
              </span>
            ))}
          </div>
        </div>

        {/* Keypad Buttons 3x4 Grid */}
        <div className={styles.keypadGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button key={n} className={styles.numBtn} onClick={() => handleNumClick(n)}>
              {n}
            </button>
          ))}
          <button className={styles.numBtn} style={{ background: '#F1B3B3', fontSize: '0.75rem' }} onClick={handleClear}>
            CLEAR
          </button>
          <button className={styles.numBtn} onClick={() => handleNumClick(0)}>
            0
          </button>
          <button className={styles.numBtn} style={{ background: '#BCE3C5', fontSize: '0.75rem' }} onClick={handleUnlock}>
            ENTER
          </button>
        </div>

        {config.hint && <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: '6px 0 0 0' }}>{config.hint}</p>}

        <button className={styles.sketchyBtn} style={{ width: '100%' }} onClick={handleUnlock}>
          UNLOCK MEMORIES 🔑
        </button>
      </div>
    </motion.div>
  );
}
