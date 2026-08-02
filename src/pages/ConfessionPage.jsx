import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function ConfessionPage({ config, onNavigate }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleHoldStart = () => {
    soundFx.playWaxCrack();
    setIsRevealed(true);
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center' }}
    >
      <h2 style={{ fontSize: '2rem', margin: 0 }}>{config.title}</h2>
      <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: '4px 0 20px 0' }}>{config.subtitle}</p>

      <div className={styles.scrollPaper} style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {!isRevealed ? (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.waxSeal}
            style={{ width: '70px', height: '70px', fontSize: '2rem', margin: 0 }}
            onClick={handleHoldStart}
          >
            ❤️
          </motion.div>
        ) : (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '1.2rem', lineHeight: '1.6', margin: 0, color: '#800F2F', fontWeight: 'bold' }}>
            {config.confessionText}
          </motion.p>
        )}
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '25px' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'NEXT PAGE →'}
      </button>
    </motion.div>
  );
}
