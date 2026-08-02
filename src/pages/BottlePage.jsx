import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function BottlePage({ config, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottle = () => {
    soundFx.playUnroll();
    setIsOpen(true);
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

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: '6rem', cursor: 'pointer' }}
        onClick={handleOpenBottle}
      >
        🍾
      </motion.div>

      {isOpen && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={styles.scrollPaper} style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>{config.letterMessage}</p>
        </motion.div>
      )}

      <button className={styles.sketchyBtn} style={{ marginTop: '25px' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'NEXT PAGE →'}
      </button>
    </motion.div>
  );
}
