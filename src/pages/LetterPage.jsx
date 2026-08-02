import React from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function LetterPage({ config, onNavigate }) {
  const handleNext = () => {
    soundFx.playClick();
    onNavigate(config.next);
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <h1 style={{ fontSize: '2.2rem', color: '#D9534F', marginBottom: '15px', textAlign: 'center' }}>
        {config.title}
      </h1>

      <div className={styles.scrollPaper}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px 0', borderBottom: '1.5px dashed #D4B886', paddingBottom: '4px' }}>
            📖 {config.section1Title}
          </h3>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
            {config.section1Text}
          </p>
        </div>

        {config.section2Title && (
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px 0', borderBottom: '1.5px dashed #D4B886', paddingBottom: '4px' }}>
              📋 {config.section2Title}
            </h3>
            {config.bulletPoints && (
              <ul style={{ listStyle: 'none', paddingLeft: '5px', margin: 0, fontSize: '1rem', lineHeight: '1.8' }}>
                {config.bulletPoints.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
          <div style={{ background: '#FFF', border: '1px solid #2C1A0E', padding: '6px', fontSize: '1.2rem', borderRadius: '4px' }}>
            🖼️
          </div>
          <div style={{ background: '#FFF', border: '1px solid #2C1A0E', padding: '6px', fontSize: '1.2rem', borderRadius: '4px' }}>
            📸
          </div>
          <div style={{ background: '#FFF', border: '1px solid #2C1A0E', padding: '6px', fontSize: '1.2rem', borderRadius: '4px' }}>
            ✨
          </div>
        </div>
      </div>

      <button className={styles.sketchyBtn} onClick={handleNext}>
        {config.buttonText || 'NEXT MEMORY →'}
      </button>
    </motion.div>
  );
}
