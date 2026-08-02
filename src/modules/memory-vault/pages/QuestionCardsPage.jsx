import React from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function QuestionCardsPage({ config, onNavigate }) {
  const handleSelect = (targetPage) => {
    soundFx.playClick();
    onNavigate(targetPage);
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
      {config.subtitle && <p style={{ fontSize: '1rem', opacity: 0.8, margin: '6px 0 25px 0' }}>{config.subtitle}</p>}

      <div className={styles.cardsGrid}>
        {config.choices?.map((choice) => (
          <motion.div
            key={choice.id}
            className={styles.choiceCard}
            whileHover={{ y: -8, scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(choice.targetPage)}
          >
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{choice.icon}</div>
            <h4 style={{ fontSize: '1rem', margin: '0 0 4px 0', fontWeight: 'bold' }}>{choice.label}</h4>
            {choice.description && <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: 0 }}>{choice.description}</p>}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
