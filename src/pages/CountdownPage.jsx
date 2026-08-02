import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/story.module.css';

export default function CountdownPage({ config, onNavigate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(config.targetDate || '2026-12-31T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [config.targetDate]);

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
      <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: '4px 0 25px 0' }}>{config.subtext}</p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {[
          { label: 'DAYS', val: timeLeft.days },
          { label: 'HOURS', val: timeLeft.hours },
          { label: 'MINS', val: timeLeft.minutes },
          { label: 'SECS', val: timeLeft.seconds }
        ].map((unit, idx) => (
          <div
            key={idx}
            className={styles.vaultCard}
            style={{ padding: '15px 10px', minWidth: '70px', borderRadius: '12px' }}
          >
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{unit.val}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{unit.label}</div>
          </div>
        ))}
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '30px' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'POLAROID WALL →'}
      </button>
    </motion.div>
  );
}
