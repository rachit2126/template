import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useStory } from '../context/StoryContext';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function EndingPage({ config }) {
  const { restartStory, exportStoryJSON } = useStory();

  React.useEffect(() => {
    soundFx.playSuccess();
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
  }, []);

  const handleReplay = () => {
    soundFx.playClick();
    restartStory();
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center' }}
    >
      <div className={styles.vaultCard} style={{ padding: '35px 25px' }}>
        <h1 style={{ fontSize: '2.4rem', color: '#D9534F', margin: '0 0 10px 0' }}>{config.title}</h1>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.6', margin: '0 0 10px 0', fontWeight: 'bold' }}>{config.message}</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.75, margin: '0 0 25px 0' }}>{config.subtext}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className={styles.sketchyBtn} style={{ marginTop: 0 }} onClick={handleReplay}>
            {config.buttonText || 'REPLAY STORY ↻'}
          </button>
          <button className={styles.sketchyBtn} style={{ marginTop: 0, background: '#FFF' }} onClick={exportStoryJSON}>
            DOWNLOAD STORY JSON 📥
          </button>
        </div>
      </div>
    </motion.div>
  );
}
