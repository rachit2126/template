import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function PuzzlePage({ config, onNavigate }) {
  const [pieces, setPieces] = useState([2, 0, 3, 1]);
  const [solved, setSolved] = useState(false);

  const swapPieces = (idx) => {
    soundFx.playClick();
    const newPieces = [...pieces];
    const targetIdx = (idx + 1) % 4;
    [newPieces[idx], newPieces[targetIdx]] = [newPieces[targetIdx], newPieces[idx]];
    setPieces(newPieces);

    if (newPieces.every((val, index) => val === index)) {
      soundFx.playSuccess();
      setSolved(true);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center' }}
    >
      <h2 style={{ fontSize: '2rem', margin: 0 }}>{config.title}</h2>
      <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: '4px 0 20px 0' }}>{config.subtitle}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', width: '240px', margin: '0 auto', border: '3px solid #2C1A0E', borderRadius: '12px', padding: '6px', background: '#FFF' }}>
        {pieces.map((val, idx) => (
          <motion.div
            key={idx}
            whileTap={{ scale: 0.9 }}
            onClick={() => swapPieces(idx)}
            style={{
              height: '110px',
              background: `url(${config.image})`,
              backgroundSize: '240px 220px',
              backgroundPosition: `${(val % 2) * -110}px ${Math.floor(val / 2) * -110}px`,
              borderRadius: '6px',
              cursor: 'pointer',
              border: '1px solid #ccc'
            }}
          />
        ))}
      </div>

      {solved && <p style={{ fontWeight: 'bold', color: '#4CAF50', margin: '12px 0 0 0' }}>🎉 PUZZLE SOLVED!</p>}

      <button className={styles.sketchyBtn} style={{ marginTop: '20px' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'NEXT PAGE →'}
      </button>
    </motion.div>
  );
}
