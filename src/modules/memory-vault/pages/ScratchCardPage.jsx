import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function ScratchCardPage({ config, onNavigate }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 200;

    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#999999';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH ME HERE ✨', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    const scratch = (e) => {
      if (!isDrawing) return;
      soundFx.playScratch();
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      checkRevealPercentage();
    };

    const checkRevealPercentage = () => {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let cleared = 0;
      for (let i = 3; i < imgData.data.length; i += 4) {
        if (imgData.data[i] === 0) cleared++;
      }
      const percent = (cleared / (canvas.width * canvas.height)) * 100;
      if (percent > 45 && !isRevealed) {
        setIsRevealed(true);
        soundFx.playSuccess();
      }
    };

    const startScratch = () => (isDrawing = true);
    const stopScratch = () => (isDrawing = false);

    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopScratch);
    canvas.addEventListener('touchstart', startScratch);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', stopScratch);

    return () => {
      canvas.removeEventListener('mousedown', startScratch);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mouseup', stopScratch);
    };
  }, [isRevealed]);

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center' }}
    >
      <h2 style={{ fontSize: '2rem', margin: 0 }}>{config.title}</h2>
      <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: '4px 0 20px 0' }}>{config.subtitle}</p>

      <div style={{ position: 'relative', width: '300px', height: '200px', margin: '0 auto', border: '3px solid #2C1A0E', borderRadius: '12px', overflow: 'hidden', background: '#FFF7E8' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
          {config.hiddenImage && <img src={config.hiddenImage} alt="secret" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '8px' }} />}
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0, color: '#2C1A0E' }}>{config.hiddenText}</p>
        </div>

        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} />
      </div>

      <button className={styles.sketchyBtn} style={{ marginTop: '25px' }} onClick={() => onNavigate(config.next)}>
        {config.buttonText || 'NEXT PAGE →'}
      </button>
    </motion.div>
  );
}
