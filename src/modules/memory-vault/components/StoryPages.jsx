import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MediaStore } from '../services/MediaStore';
import { useDeviceType } from '../hooks/useDeviceType';
import MobileVaultPage from './MobileVaultPage';
import TabletVaultPage from './TabletVaultPage';
import DesktopVaultPage from './DesktopVaultPage';
import ScrollLetterPage from './ScrollLetterPage';
export { ScrollLetterPage };

// Load Google Fonts dynamically for Scrapbook & Comic / Cursive Aesthetic
if (typeof document !== 'undefined') {
  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Impact&family=Patrick+Hand&family=Fredoka+One&family=Outfit:wght@700;900&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);
}

// ==========================================
// 1. DEFAULT DYNAMIC STORY CONFIG (VERSION 1)
// ==========================================
export const DEFAULT_STORY_CONFIG = {
  theme: "friendship",
  title: "FRIENDSHIP VAULT '24",
  footer: "Created with love, just for us.",
  pin: "1234",
  decorations: {
    polaroid1Label: "Our Road Trip '22",
    polaroid1Image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    polaroid1Tape: "#f1b581",
    polaroid1Angle: -10,

    polaroid2Label: "Inside Jokes",
    polaroid2Image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    polaroid2Tape: "#aed48f",
    polaroid2Angle: 8,

    polaroid3Label: "Memories",
    polaroid3Image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    polaroid3Tape: "#e89e9e",
    polaroid3Angle: 12,

    polaroid4Label: "Besties '24",
    polaroid4Image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    polaroid4Tape: "#85cbcf",
    polaroid4Angle: -14,

    note1Text: "Hhat is your memorie??",
    note2Text: "secret phras!..."
  },
  pages: [
    {
      id: "page-login",
      type: "vault",
      title: "ACCESSING OUR VAULT",
      subtitle: "ENTER YOUR SECRET PIN (4 DIGITS)",
      buttonText: "UNLOCK MEMORIES",
      next: "page-envelope"
    },
    {
      id: "page-envelope",
      type: "envelope",
      ribbonText: "A Message From Your Bestie",
      recipient: "TO: MY BEST FRIEND",
      subtext: "Your special friend's message is here!\nClick wax seal to unroll and read.",
      buttonText: "OPEN MESSAGE →",
      next: "page-letter"
    },
    {
      id: "page-letter",
      type: "letter",
      title: "HAPPY FRIENDSHIP DAY!",
      section1Title: "THE STORY OF US.",
      section1Text: "From that first crazy road trip... to endless inside jokes. Thank you for being my rock. Here's to many more!",
      section2Title: "UNFORGETTABLE MOMENTS.",
      bulletPoints: [
        "Road Trip '22 (Check)",
        "The \"Pancakes\" Incident (Classic)",
        "Secret Handshake Mastered (Level 100)"
      ],
      buttonText: "VIEW GALLERY →",
      next: "page-gallery"
    },
    {
      id: "page-gallery",
      type: "gallery",
      title: "OUR PHOTO ALBUM",
      subtitle: "Click any photo to zoom in",
      images: [
        { id: "g1", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80", caption: "Road Trip '22", rotation: -4 },
        { id: "g2", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80", caption: "Beach Sunset", rotation: 5 },
        { id: "g3", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", caption: "Crazy Smiles", rotation: -2 }
      ],
      buttonText: "GO TO FINALE →",
      next: "page-ending"
    },
    {
      id: "page-ending",
      type: "ending",
      title: "THANK YOU FOR BEING YOU ❤️",
      message: "Our friendship is the greatest gift of all.",
      subtext: "Created with Memory Vault Studio",
      buttonText: "REPLAY STORY ↻",
      next: "page-login"
    }
  ]
};

// ==========================================
// 2. SYNTHESIZED SOUND ENGINE (Web Audio API)
// ==========================================
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playWaxCrack() {
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1200;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) {}
  }

  playUnroll() {
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 900;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) {}
  }

  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.3);
      });
    } catch (e) {}
  }
}

export const soundFx = new SoundEngine();

// ==========================================
// 3. AMBIENT PARTICLES
// ==========================================
export const FloatingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      vx: (Math.random() - 0.5) * 0.2,
      vy: -Math.random() * 0.3 - 0.1,
      pulse: Math.random() * 0.015 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const glowGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 100,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      glowGrad.addColorStop(0, 'rgba(255, 248, 220, 0.25)');
      glowGrad.addColorStop(1, 'rgba(240, 225, 200, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.pulse;

        if (p.alpha > 1 || p.alpha < 0) p.pulse = -p.pulse;
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 120, ${Math.abs(p.alpha) * 0.7})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
};

// ==========================================
// 4. DYNAMIC DECORATION & POLAROID COMPONENTS
// ==========================================

export const WashiTape = ({ color = '#f3c781', angle = -3, style = {}, onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: 'absolute',
      width: '60px',
      height: '16px',
      background: color,
      opacity: 0.85,
      transform: `rotate(${angle}deg)`,
      borderLeft: '2px dashed rgba(0,0,0,0.15)',
      borderRight: '2px dashed rgba(0,0,0,0.15)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 12,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}
  />
);

export const PolaroidCard = ({ label, imageUrl, style, angle = 0, tapeColor = '#f3c781', tapeAngle = 0, onClick }) => {
  const [resolvedUrl, setResolvedUrl] = useState(imageUrl);

  useEffect(() => {
    let isMounted = true;
    if (imageUrl && typeof imageUrl === 'string') {
      MediaStore.getUrl(imageUrl)
        .then((url) => {
          if (isMounted) setResolvedUrl(url || imageUrl);
        })
        .catch(() => {
          if (isMounted) setResolvedUrl(imageUrl);
        });
    } else {
      setResolvedUrl(null);
    }
    return () => { isMounted = false; };
  }, [imageUrl]);

  return (
    <motion.div
      onClick={onClick}
      style={{
        position: 'absolute',
        background: '#fffdf8',
        border: '2px solid #2c1a0e',
        borderRadius: '4px',
        padding: '10px 10px 14px 10px',
        width: '145px',
        boxShadow: '3px 6px 14px rgba(0,0,0,0.12)',
        transform: `rotate(${angle}deg)`,
        zIndex: 6,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      animate={{ rotate: [angle - 0.6, angle + 0.6, angle - 0.6] }}
      transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
    >
      <WashiTape color={tapeColor} angle={tapeAngle} style={{ top: '-8px', left: '35px' }} />
      <div style={{
        background: '#eaf1f8',
        border: '1.5px solid #2c1a0e',
        borderRadius: '2px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {resolvedUrl ? (
          <img src={resolvedUrl} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <svg width="100" height="90" viewBox="0 0 100 90">
            <circle cx="35" cy="38" r="14" fill="#d99b82" stroke="#2c1a0e" strokeWidth="2" />
            <circle cx="68" cy="38" r="14" fill="#a86e59" stroke="#2c1a0e" strokeWidth="2" />
            <path d="M 18 55 Q 35 48 52 55 L 52 90 L 18 90 Z" fill="#588ec9" stroke="#2c1a0e" strokeWidth="2" />
            <path d="M 50 55 Q 68 48 86 55 L 86 90 L 50 90 Z" fill="#75c283" stroke="#2c1a0e" strokeWidth="2" />
          </svg>
        )}
      </div>
      <div style={{
        fontFamily: "'Caveat', cursive",
        fontSize: '1.25rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2c1a0e',
        marginTop: '8px'
      }}>
        {label}
      </div>
    </motion.div>
  );
};

export const HandshakeCalculatorSVG = ({ pin, onKeyPress, onClear, onEnter }) => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '360px', margin: '0 auto' }}>
      
      <svg
        width="320"
        height="60"
        viewBox="0 0 320 60"
        style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', overflow: 'visible', zIndex: 1 }}
      >
        <path d="M 40 50 A 130 45 0 0 1 280 50" fill="none" stroke="#2c1a0e" strokeWidth="1.8" strokeDasharray="4 4" />
        <path d="M 42 22 L 45 28 L 52 29 L 47 34 L 48 40 L 42 37 L 36 40 L 37 34 L 32 29 L 39 28 Z" fill="#2c1a0e" />
        <path d="M 278 22 L 281 28 L 288 29 L 283 34 L 284 40 L 278 37 L 272 40 L 273 34 L 268 29 L 275 28 Z" fill="#2c1a0e" />
      </svg>

      <div style={{ position: 'relative', width: '100%', height: '140px', zIndex: 2 }}>
        <svg
          width="100%"
          height="140"
          viewBox="0 0 360 140"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <path d="M 0 100 Q 60 70 135 55" fill="none" stroke="#2c1a0e" strokeWidth="3" />
          <path d="M 0 100 L 0 135 C 70 130 110 110 130 75 Z" fill="#f2a88a" stroke="#2c1a0e" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 0 65 L 45 90 L 0 120 Z" fill="#f2a88a" stroke="#2c1a0e" strokeWidth="2.5" />
          <rect x="110" y="52" width="10" height="22" rx="4" fill="#3a72d7" stroke="#2c1a0e" strokeWidth="2" transform="rotate(-15 110 52)" />

          <path d="M 360 100 Q 300 70 225 55" fill="none" stroke="#2c1a0e" strokeWidth="3" />
          <path d="M 360 100 L 360 135 C 290 130 250 110 230 75 Z" fill="#d98c6c" stroke="#2c1a0e" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 360 65 L 315 90 L 360 120 Z" fill="#d98c6c" stroke="#2c1a0e" strokeWidth="2.5" />
          <rect x="238" y="50" width="10" height="22" rx="4" fill="#58a364" stroke="#2c1a0e" strokeWidth="2" transform="rotate(15 238 50)" />

          <g transform="translate(142, 22)">
            <path d="M 5 35 C 5 20 20 10 38 15 C 45 18 48 26 42 35 C 35 42 15 45 5 35 Z" fill="#f2a88a" stroke="#2c1a0e" strokeWidth="2.5" />
            <path d="M 38 15 C 55 10 70 20 70 35 C 70 45 50 42 42 35 Z" fill="#d98c6c" stroke="#2c1a0e" strokeWidth="2.5" />
            <path d="M 22 24 Q 30 32 38 24" fill="none" stroke="#2c1a0e" strokeWidth="2" />
            <path d="M 26 32 Q 34 38 42 32" fill="none" stroke="#2c1a0e" strokeWidth="2" />
            <path d="M 38 20 Q 46 26 54 20" fill="none" stroke="#2c1a0e" strokeWidth="2" />
            <path d="M 42 28 Q 50 34 58 28" fill="none" stroke="#2c1a0e" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <div style={{
        position: 'relative',
        width: '230px',
        margin: '-58px auto 0 auto',
        background: '#e2dacb',
        border: '2.5px solid #2c1a0e',
        borderRadius: '16px',
        padding: '12px 10px 10px 10px',
        boxShadow: '0 6px 0 #b3a591, 0 8px 12px rgba(0,0,0,0.15)',
        zIndex: 10
      }}>
        <div style={{
          background: '#dcd3be',
          border: '2px solid #2c1a0e',
          borderRadius: '8px',
          padding: '6px 8px 8px 8px',
          marginBottom: '8px',
          textAlign: 'center',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontFamily: "'Patrick Hand', cursive",
            fontSize: '0.85rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
            color: '#2c1a0e',
            marginBottom: '4px'
          }}>
            PIN CODE
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{
                width: '30px',
                height: '22px',
                background: '#f7f3e8',
                border: '1.5px solid #2c1a0e',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
              }}>
                <AnimatePresence mode="wait">
                  {pin[i] ? (
                    <motion.div
                      key="dot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{
                        width: '10px',
                        height: '9px',
                        background: '#2c1a0e',
                        borderRadius: '2px'
                      }}
                    />
                  ) : (
                    <span key="dash" style={{ color: '#8c7e6c', fontSize: '0.85rem', fontFamily: 'sans-serif' }}>-</span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <motion.button
              key={n}
              whileTap={{ y: 3, boxShadow: '0 0 0 #b0a38f' }}
              onClick={() => onKeyPress(n)}
              style={{
                background: '#fffdf7',
                border: '2px solid #2c1a0e',
                borderRadius: '6px',
                padding: '4px 0',
                fontFamily: "'Patrick Hand', cursive",
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#2c1a0e',
                cursor: 'pointer',
                boxShadow: '0 3px 0 #b0a38f',
                userSelect: 'none'
              }}
            >
              {n}
            </motion.button>
          ))}

          <motion.button
            whileTap={{ y: 3, boxShadow: '0 0 0 #c27b7b' }}
            onClick={onClear}
            style={{
              background: '#ea9f9f',
              border: '2px solid #2c1a0e',
              borderRadius: '6px',
              padding: '4px 0',
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '0.65rem',
              fontWeight: 'bold',
              color: '#2c1a0e',
              cursor: 'pointer',
              boxShadow: '0 3px 0 #c27b7b',
              userSelect: 'none'
            }}
          >
            CLEAR
          </motion.button>

          <motion.button
            whileTap={{ y: 3, boxShadow: '0 0 0 #b0a38f' }}
            onClick={() => onKeyPress(0)}
            style={{
              background: '#fffdf7',
              border: '2px solid #2c1a0e',
              borderRadius: '6px',
              padding: '4px 0',
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#2c1a0e',
              cursor: 'pointer',
              boxShadow: '0 3px 0 #b0a38f',
              userSelect: 'none'
            }}
          >
            0
          </motion.button>

          <motion.button
            whileTap={{ y: 3, boxShadow: '0 0 0 #7ca380' }}
            onClick={onEnter}
            style={{
              background: '#a2d0a7',
              border: '2px solid #2c1a0e',
              borderRadius: '6px',
              padding: '4px 0',
              fontFamily: "'Patrick Hand', cursive",
              fontSize: '0.65rem',
              fontWeight: 'bold',
              color: '#2c1a0e',
              cursor: 'pointer',
              boxShadow: '0 3px 0 #7ca380',
              userSelect: 'none'
            }}
          >
            ENTER
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// PAGE 1: VAULT LOGIN PAGE (MODULAR DEVICE ROUTER)
export const VaultPage = (props) => {
  const device = useDeviceType();

  switch (device) {
    case 'mobile':
      return <MobileVaultPage {...props} />;
    case 'tablet':
      return <TabletVaultPage {...props} />;
    case 'desktop':
    default:
      return <DesktopVaultPage {...props} />;
  }
};

// PAGE 2: ENVELOPE + WAX SEAL PAGE
export const EnvelopePage = ({ config, onNavigate, onElementClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    soundFx.playWaxCrack();
    setIsOpen(true);
    setTimeout(() => {
      soundFx.playUnroll();
      onNavigate(config.next);
    }, 1000);
  };

  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5, width: '100%' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <div style={{ position: 'relative', width: '340px', height: '220px', marginBottom: '30px' }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10%',
            width: '80%',
            height: '60px',
            background: '#fbf4db',
            border: '2px solid #2c1a0e',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
          }}
          animate={isOpen ? { y: -110 } : { y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div style={{ background: '#4a6fa5', color: '#fff', padding: '4px 12px', fontFamily: "'Patrick Hand', cursive", fontSize: '0.9rem', borderRadius: '4px' }}>
            {config.ribbonText || 'A Message From Your Bestie'}
          </div>
        </motion.div>

        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#f3e5be',
          border: '2px solid #2c1a0e',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 0,
              borderLeft: '170px solid transparent',
              borderRight: '170px solid transparent',
              borderTop: '100px solid #e2cfa0',
              transformOrigin: 'top',
              transition: 'transform 0.6s ease',
              transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)'
            }}
          />

          <div style={{ fontFamily: "'Impact', sans-serif", fontSize: '1.3rem', zIndex: 5 }} onClick={() => onElementClick && onElementClick('recipient')}>
            {config.recipient || 'TO: MY BEST FRIEND'}
          </div>

          <motion.div
            style={{
              width: '50px',
              height: '50px',
              background: 'radial-gradient(circle, #b83232, #7a1c1c)',
              border: '2px solid #2c1a0e',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffd700',
              fontSize: '1.4rem',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              zIndex: 6,
              marginTop: '10px'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
          >
            ★
          </motion.div>

          <div style={{ marginTop: '15px', textAlign: 'center', fontFamily: "'Patrick Hand', cursive", fontSize: '1rem', zIndex: 5 }}>
            {(config.subtext || 'Click wax seal to unroll').split('\n').map((line, i) => (
              <p key={i} style={{ margin: 2 }}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleOpen}
        style={{
          background: '#a2d0a7',
          border: '2px solid #2c1a0e',
          borderRadius: '20px',
          padding: '10px 24px',
          fontFamily: "'Impact', sans-serif",
          fontSize: '1rem',
          letterSpacing: '1px',
          cursor: 'pointer',
          boxShadow: '0 4px 0 #2c1a0e'
        }}
      >
        {config.buttonText || 'OPEN MESSAGE →'}
      </button>
    </motion.div>
  );
};

// PAGE 3: LETTER PAGE (Imported from ScrollLetterPage.jsx)

// PAGE 4: MEMORY GALLERY PAGE
export const GalleryPage = ({ config, onNavigate, onElementClick }) => {
  const imagesList = config.images || [];

  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5, width: '100%', maxWidth: '800px' }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ fontFamily: "'Impact', sans-serif", fontSize: '2.2rem', margin: 0, textAlign: 'center' }}>
        {config.title || 'OUR PHOTO ALBUM'}
      </h2>
      <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2rem', margin: '4px 0 20px 0', opacity: 0.8 }}>
        {config.subtitle || 'Click any photo to zoom in'}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {imagesList.map((img, idx) => (
          <motion.div
            key={img.id || idx}
            whileHover={{ scale: 1.06, rotate: 0 }}
            style={{
              background: '#FFF',
              border: '2px solid #2c1a0e',
              padding: '10px 10px 15px 10px',
              borderRadius: '4px',
              width: '160px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              transform: `rotate(${img.rotation || 0}deg)`,
              cursor: 'pointer'
            }}
            onClick={() => onElementClick && onElementClick(`gallery-img-${idx}`)}
          >
            <div style={{ height: '130px', background: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
              <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1rem', fontWeight: 'bold', margin: '8px 0 0 0', textAlign: 'center' }}>
              {img.caption}
            </p>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => onNavigate(config.next)}
        style={{
          background: '#a2d0a7',
          border: '2px solid #2c1a0e',
          borderRadius: '20px',
          padding: '10px 24px',
          fontFamily: "'Impact', sans-serif",
          fontSize: '1rem',
          letterSpacing: '1px',
          cursor: 'pointer',
          boxShadow: '0 4px 0 #2c1a0e',
          marginTop: '30px'
        }}
      >
        {config.buttonText || 'GO TO FINALE →'}
      </button>
    </motion.div>
  );
};

// PAGE 5: ENDING PAGE
export const EndingPage = ({ config, onNavigate }) => {
  useEffect(() => {
    soundFx.playSuccess();
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  }, []);

  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5, textAlign: 'center' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{
        background: '#fffdf7',
        border: '2.5px solid #2c1a0e',
        borderRadius: '16px',
        padding: '35px 25px',
        maxWidth: '420px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
      }}>
        <h1 style={{ fontFamily: "'Impact', sans-serif", fontSize: '2.2rem', color: '#d9534f', margin: '0 0 10px 0' }}>
          {config.title || 'THANK YOU FOR BEING YOU ❤️'}
        </h1>
        <p style={{ fontFamily: "'Patrick Hand', cursive", fontSize: '1.3rem', margin: '0 0 10px 0', fontWeight: 'bold' }}>
          {config.message}
        </p>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1rem', opacity: 0.75, margin: '0 0 25px 0' }}>
          {config.subtext}
        </p>

        <button
          onClick={() => onNavigate(config.next)}
          style={{
            background: '#a2d0a7',
            border: '2px solid #2c1a0e',
            borderRadius: '20px',
            padding: '10px 24px',
            fontFamily: "'Impact', sans-serif",
            fontSize: '1rem',
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 4px 0 #2c1a0e',
            width: '100%'
          }}
        >
          {config.buttonText || 'REPLAY STORY ↻'}
        </button>
      </div>
    </motion.div>
  );
};
