import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function MusicPlayerPage({ config, onNavigate }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  const tracks = config.tracks || [
    { title: 'Best Friend Forever', artist: 'Special Theme' }
  ];
  const currentTrack = tracks[activeTrackIndex] || tracks[0];

  const togglePlay = () => {
    soundFx.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    soundFx.playClick();
    setActiveTrackIndex((prev) => (prev + 1) % tracks.length);
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

      <div className={styles.vaultCard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px' }}>
        <motion.div
          className={styles.vinylDisc}
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <div className={styles.vinylLabel}>🎶</div>
        </motion.div>

        <h3 style={{ margin: '15px 0 2px 0', fontSize: '1.3rem' }}>{currentTrack.title}</h3>
        <p style={{ fontSize: '0.85rem', opacity: 0.7, margin: '0 0 15px 0' }}>{currentTrack.artist}</p>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button className={styles.sketchyBtn} style={{ marginTop: 0, padding: '8px 16px' }} onClick={togglePlay}>
            {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
          </button>
          {tracks.length > 1 && (
            <button className={styles.sketchyBtn} style={{ marginTop: 0, padding: '8px 16px', background: '#FFF' }} onClick={handleNextTrack}>
              ⏭ NEXT SONG
            </button>
          )}
        </div>
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '25px' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'CONTINUE STORY →'}
      </button>
    </motion.div>
  );
}
