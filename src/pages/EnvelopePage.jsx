import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import { generateWaxFragments } from '../core/PhysicsEngine/PhysicsEngine';
import styles from '../styles/story.module.css';

export default function EnvelopePage({ config, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fragments, setFragments] = useState([]);

  const handleWaxClick = () => {
    if (isOpen) return;
    soundFx.playWaxCrack();
    setFragments(generateWaxFragments(10));
    setIsOpen(true);

    setTimeout(() => {
      soundFx.playUnroll();
      onNavigate(config.next);
    }, 1100);
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.envelopeOuter}>
        <motion.div
          className={styles.scrollRoll}
          animate={isOpen ? { y: -120, rotate: -3 } : { y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.ribbonBand}>{config.ribbonText}</div>
        </motion.div>

        <div className={styles.envelopeBody}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', zIndex: 5, marginTop: '25px' }}>
            {config.recipient}
          </div>

          <div className={styles.waxSeal} onClick={handleWaxClick}>
            ★
          </div>

          {/* Wax Cracking Fragment Animation */}
          {isOpen &&
            fragments.map((frag) => (
              <motion.div
                key={frag.id}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 0, x: frag.x, y: frag.y, rotate: frag.rotation, scale: 0.2 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: 'absolute',
                  width: '12px',
                  height: '12px',
                  background: '#B83232',
                  borderRadius: '3px',
                  zIndex: 20
                }}
              />
            ))}

          <p style={{ fontSize: '0.85rem', textAlign: 'center', margin: '15px 20px 0 20px', zIndex: 5, opacity: 0.85 }}>
            {config.subtext}
          </p>
        </div>
      </div>

      <button className={styles.sketchyBtn} onClick={handleWaxClick}>
        {config.buttonText || 'UNROLL MESSAGE →'}
      </button>
    </motion.div>
  );
}
