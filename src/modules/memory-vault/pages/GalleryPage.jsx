import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function GalleryPage({ config, onNavigate }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (img) => {
    soundFx.playCameraShutter();
    setSelectedPhoto(img);
  };

  const handleNext = () => {
    soundFx.playClick();
    onNavigate(config.next);
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ fontSize: '2rem', margin: 0, textAlign: 'center' }}>{config.title}</h2>
      <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: '5px 0 20px 0', textAlign: 'center' }}>
        {config.subtitle}
      </p>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
        {config.images?.map((img) => (
          <motion.div
            key={img.id}
            className={styles.scrapPolaroid}
            style={{ position: 'relative', top: 0, left: 0, width: '130px', transform: `rotate(${img.rotation || 0}deg)` }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePhotoClick(img)}
          >
            <div className={styles.washiTape} />
            <div className={styles.polaroidPhotoArea} style={{ height: '100px' }}>
              <img src={img.url} alt={img.caption} />
            </div>
            <p className={styles.polaroidCaption}>{img.caption}</p>
          </motion.div>
        ))}
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '30px' }} onClick={handleNext}>
        {config.buttonText || 'CONTINUE STORY →'}
      </button>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={{
                background: '#fff',
                padding: '15px 15px 25px 15px',
                borderRadius: '8px',
                maxWidth: '420px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <h3 style={{ margin: '15px 0 5px 0', fontSize: '1.4rem' }}>{selectedPhoto.caption}</h3>
              <button
                className={styles.sketchyBtn}
                style={{ marginTop: '10px', padding: '6px 16px', fontSize: '0.85rem' }}
                onClick={() => setSelectedPhoto(null)}
              >
                CLOSE PHOTO ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
