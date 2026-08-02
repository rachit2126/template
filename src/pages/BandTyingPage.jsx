import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function BandTyingPage({ config, onNavigate }) {
  const [isTied, setIsTied] = useState(false);

  const handleTieKnot = () => {
    if (isTied) return;
    soundFx.playSuccess();
    setIsTied(true);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
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

      <div
        className={styles.vaultCard}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', padding: '30px' }}
        onClick={handleTieKnot}
      >
        <motion.div animate={isTied ? { scale: [1, 1.2, 1] } : {}} style={{ fontSize: '5rem', marginBottom: '15px' }}>
          {isTied ? '🪡' : '🧵'}
        </motion.div>
        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{isTied ? config.knotText : 'Click to Tie the Friendship Band Knot'}</h3>
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '25px' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'NEXT PAGE →'}
      </button>
    </motion.div>
  );
}
