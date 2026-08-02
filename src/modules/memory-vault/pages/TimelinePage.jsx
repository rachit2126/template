import React from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function TimelinePage({ config, onNavigate }) {
  const events = config.events || [];

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ fontSize: '2rem', margin: '0 0 20px 0', textAlign: 'center' }}>{config.title}</h2>

      <div style={{ position: 'relative', borderLeft: '3px dashed #2C1A0E', paddingLeft: '20px', marginLeft: '10px' }}>
        {events.map((ev, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            style={{ marginBottom: '20px', position: 'relative' }}
          >
            <div
              style={{
                position: 'absolute',
                left: '-29px',
                top: '4px',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                background: '#F8D48E',
                border: '2px solid #2C1A0E'
              }}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', background: '#2C1A0E', color: '#FFF', padding: '2px 8px', borderRadius: '10px' }}>
              {ev.year}
            </span>
            <h4 style={{ margin: '4px 0 2px 0', fontSize: '1.1rem' }}>{ev.title}</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>{ev.desc}</p>
          </motion.div>
        ))}
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '20px', alignSelf: 'center' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'NEXT PAGE →'}
      </button>
    </motion.div>
  );
}
