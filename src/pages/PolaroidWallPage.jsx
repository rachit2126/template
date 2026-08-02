import React from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function PolaroidWallPage({ config, onNavigate }) {
  const photos = config.photos || [];

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
        style={{
          position: 'relative',
          width: '100%',
          height: '280px',
          background: '#DDBEA9',
          border: '3px solid #2C1A0E',
          borderRadius: '16px',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.15)',
          overflow: 'hidden'
        }}
      >
        {photos.map((p) => (
          <motion.div
            key={p.id}
            drag
            dragConstraints={{ left: 0, right: 200, top: 0, bottom: 120 }}
            className={styles.scrapPolaroid}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: '110px',
              cursor: 'grab',
              transform: `rotate(${p.rot || 0}deg)`
            }}
            whileTap={{ scale: 1.1, cursor: 'grabbing' }}
            onDragStart={() => soundFx.playClick()}
          >
            <div className={styles.washiTape} />
            <div className={styles.polaroidPhotoArea} style={{ height: '70px' }}>
              <img src={p.url} alt={p.label} />
            </div>
            <p className={styles.polaroidCaption}>{p.label}</p>
          </motion.div>
        ))}
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '25px' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'FINALE PAGE →'}
      </button>
    </motion.div>
  );
}
