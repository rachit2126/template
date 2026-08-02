import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function GiftBoxPage({ config, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    soundFx.playSuccess();
    setIsOpen(true);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
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

      <div style={{ position: 'relative', margin: '0 auto', cursor: 'pointer' }} onClick={handleOpenGift}>
        <motion.div
          animate={isOpen ? { y: -80, rotate: -15, opacity: 0 } : { y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '5.5rem' }}
        >
          🎁
        </motion.div>

        {isOpen && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={styles.vaultCard}
            style={{ padding: '20px', marginTop: '10px' }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.3rem', color: '#D9534F' }}>{config.giftTitle}</h3>
            <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>{config.giftDescription}</p>
          </motion.div>
        )}
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '25px' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'VIEW TIMELINE →'}
      </button>
    </motion.div>
  );
}
