import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function VaultPage({ config, onNavigate, defaultPin = '1234' }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const targetPin = config.pin || defaultPin;

  const handleNumClick = (num) => {
    soundFx.playKeypad();
    if (pin.length < 4) {
      setPin((prev) => prev + num);
      setError(false);
    }
  };

  const handleClear = () => {
    soundFx.playClick();
    setPin('');
    setError(false);
  };

  const handleUnlock = () => {
    if (pin === targetPin) {
      soundFx.playDoorClang();
      soundFx.playSuccess();
      onNavigate(config.next);
    } else {
      soundFx.playClick();
      setError(true);
      setPin('');
    }
  };

  return (
    <motion.div
      className={styles.pageContainer}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ========================================================
          BACKGROUND SCRAPBOOK DECORATIONS (MATCHING REFERENCE 1:1)
          ======================================================== */}
      <div className={styles.scrapbookBackgroundLayer}>
        {/* Left Torn Lined Paper Sheet */}
        <div className={styles.paperTearLeft} />

        {/* Top-Left Polaroid: Our Road Trip '22 */}
        <div className={styles.polaroidCard} style={{ top: '80px', left: '40px', transform: 'rotate(-7deg)', width: '135px' }}>
          <div className={styles.tapeStrip} style={{ background: '#F8B595' }} />
          <div className={styles.polaroidImgBox} style={{ height: '110px' }}>
            <svg width="75" height="75" viewBox="0 0 100 100" fill="none">
              <circle cx="35" cy="40" r="14" fill="#6C5CE7" />
              <path d="M15 75C15 60 25 52 35 52C45 52 55 60 55 75" fill="#6C5CE7" />
              <circle cx="65" cy="42" r="14" fill="#00B894" />
              <path d="M45 75C45 62 55 54 65 54C75 54 85 62 85 75" fill="#00B894" />
            </svg>
          </div>
          <p className={styles.polaroidCaptionText}>Our Road Trip '22</p>
        </div>

        {/* Bottom-Left Polaroid: Friends Hug */}
        <div className={styles.polaroidCard} style={{ bottom: '40px', left: '25px', transform: 'rotate(5deg)', width: '135px' }}>
          <div className={styles.tapeStrip} style={{ background: '#A0E7E5' }} />
          <div className={styles.polaroidImgBox} style={{ height: '110px' }}>
            <svg width="75" height="75" viewBox="0 0 100 100" fill="none">
              <circle cx="40" cy="38" r="13" fill="#E84393" />
              <circle cx="60" cy="40" r="13" fill="#FDCB6E" />
              <path d="M20 78C20 62 30 54 40 54C50 54 60 62 60 78" fill="#E84393" />
              <path d="M40 78C40 64 50 56 60 56C70 56 80 64 80 78" fill="#FDCB6E" />
            </svg>
          </div>
          <div className={styles.polaroidCaptionText} style={{ fontSize: '0.85rem' }}>What is your memorie??</div>
        </div>

        {/* Top-Right Polaroid: Inside Jokes */}
        <div className={styles.polaroidCard} style={{ top: '70px', right: '40px', transform: 'rotate(6deg)', width: '135px' }}>
          <div className={styles.tapeStrip} style={{ background: '#B5EAD7' }} />
          <div className={styles.polaroidImgBox} style={{ height: '110px' }}>
            <svg width="75" height="75" viewBox="0 0 100 100" fill="none">
              <circle cx="35" cy="40" r="13" fill="#0984E3" />
              <circle cx="65" cy="40" r="13" fill="#00B894" />
              <path d="M15 75C15 60 25 52 35 52C45 52 55 60 55 75" fill="#0984E3" />
              <path d="M45 75C45 62 55 54 65 54C75 54 85 62 85 75" fill="#00B894" />
              <path d="M42 22 Q50 15 58 22" stroke="#E84393" strokeWidth="2.5" fill="none" />
            </svg>
          </div>
          <p className={styles.polaroidCaptionText}>Inside Jokes</p>
        </div>

        {/* Right Lined Notepad Paper Scrap: secret phras!... */}
        <div
          style={{
            position: 'absolute',
            right: '110px',
            top: '300px',
            background: '#FFFFFF',
            border: '1.5px solid #2C1A0E',
            borderRadius: '4px',
            padding: '8px 12px',
            boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
            transform: 'rotate(-5deg)',
            fontFamily: 'Caveat, cursive',
            fontSize: '1rem',
            fontWeight: 'bold',
            zIndex: 4
          }}
        >
          <div className={styles.tapeStrip} style={{ width: '40px', height: '14px', top: '-7px', background: '#F4C493' }} />
          secret phras!...
        </div>

        {/* Bottom-Right Polaroid: Friends */}
        <div className={styles.polaroidCard} style={{ bottom: '30px', right: '30px', transform: 'rotate(-4deg)', width: '135px' }}>
          <div className={styles.tapeStrip} style={{ background: '#74B9FF' }} />
          <div className={styles.polaroidImgBox} style={{ height: '110px' }}>
            <svg width="75" height="75" viewBox="0 0 100 100" fill="none">
              <circle cx="38" cy="38" r="13" fill="#00B894" />
              <circle cx="62" cy="40" r="13" fill="#FDCB6E" />
              <path d="M20 78C20 62 30 54 40 54C50 54 60 62 60 78" fill="#00B894" />
              <path d="M42 78C42 64 52 56 62 56C72 56 82 64 82 78" fill="#FDCB6E" />
            </svg>
          </div>
        </div>

        {/* Doodled Hearts & Stars Floating Around */}
        <div className={styles.doodle} style={{ top: '120px', left: '210px', fontSize: '1.4rem' }}>💖</div>
        <div className={styles.doodle} style={{ top: '350px', left: '175px', fontSize: '1.4rem' }}>💙</div>
        <div className={styles.doodle} style={{ top: '380px', left: '50px', fontSize: '1.3rem' }}>⭐</div>
        <div className={styles.doodle} style={{ top: '110px', right: '200px', fontSize: '1.4rem' }}>💖</div>
        <div className={styles.doodle} style={{ top: '330px', right: '40px', fontSize: '1.3rem' }}>💙</div>
        <div className={styles.doodle} style={{ top: '420px', right: '190px', fontSize: '1.4rem' }}>⭐</div>
      </div>

      {/* ========================================================
          CENTER KRAFT & WHITE VAULT CARD COMPOSITION
          ======================================================== */}
      
      {/* Brown Kraft Paper Layer behind card */}
      <div className={styles.kraftLayer} />

      {/* Main Central White Card */}
      <div
        className={styles.mainWhiteCard}
        style={{
          animation: error ? 'shake 0.4s ease-in-out' : 'none'
        }}
      >
        {/* Masking Tape at Top Center */}
        <div className={styles.topCenterMaskingTape} />

        {/* Main Title */}
        <h1 className={styles.cardTitle}>{config.title || 'ACCESSING OUR VAULT'}</h1>

        {/* Subtitle */}
        <p className={styles.cardSubtitle}>{config.subtitle || 'ENTER YOUR SECRET PIN (4 DIGITS)'}</p>

        {/* Dashed Arc Arrow & Handshake Artwork */}
        <div className={styles.handshakeWrapper}>
          {/* Arc Dashed Arrow & Stars */}
          <svg width="220" height="30" viewBox="0 0 220 30" fill="none" style={{ marginBottom: '-10px' }}>
            <path d="M 20 25 Q 110 0 200 25" stroke="#2C1A0E" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <text x="15" y="15" fill="#F59E0B" fontSize="14">✦</text>
            <text x="195" y="15" fill="#F59E0B" fontSize="14">✦</text>
          </svg>

          {/* Handshake Arms Vector Illustration */}
          <div style={{ position: 'relative', width: '280px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="280" height="140" viewBox="0 0 280 140" fill="none" style={{ position: 'absolute', inset: 0 }}>
              {/* Left Arm (Pinkish-tan skin, blue wristband) */}
              <path d="M 10 120 L 70 75 L 110 75 C 120 75 130 65 140 60" stroke="#2C1A0E" strokeWidth="3" fill="#E8B496" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="55" y="70" width="12" height="16" rx="4" fill="#3B82F6" stroke="#2C1A0E" strokeWidth="2" />

              {/* Right Arm (Brown skin, green wristband) */}
              <path d="M 270 120 L 210 75 L 170 75 C 160 75 150 65 140 60" stroke="#2C1A0E" strokeWidth="3" fill="#C68B59" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="213" y="70" width="12" height="16" rx="4" fill="#10B981" stroke="#2C1A0E" strokeWidth="2" />

              {/* Clasping Hands Detail */}
              <path d="M 125 50 C 120 40 140 35 150 45 C 155 52 145 65 135 65 Z" fill="#E8B496" stroke="#2C1A0E" strokeWidth="2.5" />
              <path d="M 140 45 C 145 38 160 45 155 55 C 150 62 135 62 135 55 Z" fill="#C68B59" stroke="#2C1A0E" strokeWidth="2.5" />
            </svg>

            {/* Retro Handheld Calculator / Keypad Device */}
            <div className={styles.calculatorDevice} style={{ marginTop: '50px' }}>
              <div className={styles.calculatorHeaderLabel}>PIN CODE</div>

              {/* Inset LCD Display with 4 Square Slots */}
              <div className={styles.lcdDisplayBox}>
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className={styles.pinSlotSquare}>
                    {pin[idx] ? <div className={styles.pinDotFilled} /> : null}
                  </div>
                ))}
              </div>

              {/* Keypad Buttons 3x4 Grid */}
              <div className={styles.calcButtonsGrid}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <button key={n} className={styles.calcBtn} onClick={() => handleNumClick(n)}>
                    {n}
                  </button>
                ))}
                <button className={`${styles.calcBtn} ${styles.calcBtnClear}`} onClick={handleClear}>
                  CLEAR
                </button>
                <button className={styles.calcBtn} onClick={() => handleNumClick(0)}>
                  0
                </button>
                <button className={`${styles.calcBtn} ${styles.calcBtnEnter}`} onClick={handleUnlock}>
                  ENTER
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Illustrated Green Ribbon Button */}
        <div style={{ marginTop: '55px' }}>
          <button className={styles.greenRibbonBtn} onClick={handleUnlock}>
            {config.buttonText || 'UNLOCK MEMORIES'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
