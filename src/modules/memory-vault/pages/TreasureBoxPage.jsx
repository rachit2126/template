import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function TreasureBoxPage({ config, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChest = () => {
    if (isOpen) return;
    soundFx.playDoorClang();
    soundFx.playSuccess();
    setIsOpen(true);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center' }}
    >
      <h2 style={{ fontSize: '2rem', margin: 0 }}>{config.title}</h2>
      <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: '5px 0 25px 0' }}>{config.subtitle}</p>

      <div style={{ position: 'relative', width: '260px', margin: '0 auto' }}>
        <motion.div
          animate={isOpen ? { scale: 1.1, rotateY: 180 } : { scale: 1 }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: '6rem',
            cursor: 'pointer',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
          }}
          onClick={handleOpenChest}
        >
          {isOpen ? '👑' : '🧰'}
        </motion.div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#FFF7E8',
              border: '2px solid #2C1A0E',
              borderRadius: '12px',
              padding: '15px',
              marginTop: '15px',
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
          >
            {config.secretReward}
          </motion.div>
        )}
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '30px' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'NEXT MEMORY →'}
      </button>
    </motion.div>
  );
}
