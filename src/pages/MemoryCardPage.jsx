import React from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function MemoryCardPage({ config, onNavigate }) {
  const handleNext = () => {
    soundFx.playClick();
    onNavigate(config.next);
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, rotate: -2 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: 2 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center' }}
    >
      <div style={{ marginBottom: '15px' }}>
        <h2 style={{ fontSize: '2.2rem', margin: 0 }}>{config.title}</h2>
        {config.subtitle && <p style={{ fontSize: '1.2rem', opacity: 0.8, margin: '2px 0 0 0' }}>{config.subtitle}</p>}
      </div>

      <div
        style={{
          background: '#ffffff',
          border: '3px solid #2C1A0E',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
          maxWidth: '360px',
          width: '100%',
          position: 'relative'
        }}
      >
        <div className={styles.washiTape} />
        <img
          src={config.image}
          alt={config.title}
          style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }}
        />
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '25px', background: '#FFFFFF' }} onClick={handleNext}>
        {config.buttonText || 'NEXT MEMORY →'}
      </button>
    </motion.div>
  );
}
