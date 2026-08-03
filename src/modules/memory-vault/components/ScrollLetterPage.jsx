import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundFx } from './StoryPages';
import '../styles/ScrollLetterPage.css';

/* ==================================================
   MODULAR REUSABLE SCRAPBOOK COMPONENTS
================================================== */

// 1. Washi Tape Strip Component
export function Tape({ color = "rgba(255, 183, 3, 0.8)", angle = 0, style = {}, className = "" }) {
  return (
    <div
      className={`mv-tape-strip ${className}`}
      style={{
        backgroundColor: color,
        transform: `translateX(-50%) rotate(${angle}deg)`,
        ...style
      }}
    />
  );
}

// 2. Polaroid Component
export function Polaroid({ image, caption, rotation = 0, tapeColor = "#f1b581", className = "", style = {}, onClick }) {
  return (
    <motion.div
      className={`mv-decor-polaroid ${className}`}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
      onClick={onClick}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
      whileTap={{ scale: 0.95 }}
    >
      <Tape color={tapeColor} angle={-2} style={{ top: '-10px', left: '50%', width: '55px' }} />
      <img src={image} alt={caption} />
      {caption && <div className="caption">{caption}</div>}
    </motion.div>
  );
}

// 3. Sticky Note Component
export function StickyNote({ text, tapeColor = "#f2bd92", rotation = 0, className = "", style = {}, onClick, children }) {
  return (
    <motion.div
      className={`mv-sticky-note ${className}`}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
      onClick={onClick}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      <Tape color={tapeColor} angle={-2} style={{ top: '-8px', left: '30%', width: '45px' }} />
      <span>{text}</span>
      {children}
    </motion.div>
  );
}

// 4. 8-Layered Scrapbook Background Component
export function ScrapbookBackground({ isInsideStudio = false }) {
  return (
    <>
      <div className={`mv-bg-layer-1 ${isInsideStudio ? 'inside-studio-canvas' : ''}`} />
      <div className={`mv-bg-layer-2 ${isInsideStudio ? 'inside-studio-canvas' : ''}`} />
      <div className={`mv-bg-layer-3 ${isInsideStudio ? 'inside-studio-canvas' : ''}`} />
      <div className={`mv-bg-layer-4 ${isInsideStudio ? 'inside-studio-canvas' : ''}`}>
        <motion.span className="doodle-particle d-p1" animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>💖</motion.span>
        <motion.span className="doodle-particle d-p2" animate={{ y: [0, -8, 0], scale: [1, 1.18, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>✨</motion.span>
        <motion.span className="doodle-particle d-p3" animate={{ y: [0, -12, 0], rotate: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}>🌟</motion.span>
        <motion.span className="doodle-particle d-p4" animate={{ y: [0, -7, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>🌸</motion.span>
        <motion.span className="doodle-particle d-p5" animate={{ y: [0, -11, 0], rotate: [0, 10, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>🎉</motion.span>
        <motion.span className="doodle-particle d-p6" animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>💫</motion.span>
      </div>
      <div className={`mv-bg-layer-8 ${isInsideStudio ? 'inside-studio-canvas' : ''}`} />
    </>
  );
}

// 5. Scroll Paper Parchment Container Component
export function ScrollPaper({ children, variants }) {
  return (
    <div className="mv-scroll-wrapper">
      <motion.div
        className="mv-scroll-frame"
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        <Tape color="rgba(255, 183, 3, 0.8)" style={{ top: '-8px', left: '50%', width: '50px' }} />

        {/* Left Wooden Handle */}
        <div className="mv-handle mv-handle-l">
          <div className="mv-knob-top" />
          <div className="mv-knob-bottom" />
        </div>

        {/* Right Wooden Handle */}
        <div className="mv-handle mv-handle-r">
          <div className="mv-knob-top" />
          <div className="mv-knob-bottom" />
        </div>

        {children}
      </motion.div>
    </div>
  );
}

/* ==================================================
   MAIN LETTER STORY PAGE COMPONENT
================================================== */
export default function ScrollLetterPage({ config = {}, story = {}, storyDecorations = {}, onNavigate, onElementClick, isInsideStudio = false }) {
  // Support both config and story bindings seamlessly
  const title = config?.title || story?.title || "HAPPY FRIENDSHIP DAY!";
  const storyTitle = config?.section1Title || story?.storyTitle || "THE STORY OF US.";
  const storyText = config?.section1Text || story?.storyText || "From that first crazy road trip... to endless inside jokes. Thank you for being my rock. Here's to many more!";
  const section2Title = config?.section2Title || "UNFORGETTABLE MOMENTS.";
  const bulletPoints = Array.isArray(config?.bulletPoints) && config.bulletPoints.length > 0
    ? config.bulletPoints
    : (Array.isArray(story?.moments) && story.moments.length > 0 ? story.moments : ["Road Trip '22 (Check)", "The \"Pancakes\" Incident (Classic)", "- Stargazing Night", "Secret Handshake Mastered (Level 100)"]);
  
  const icon1 = config?.icon1 || "📖";
  const icon2 = config?.icon2 || "📋";
  const buttonText = config?.buttonText || story?.nextButton?.text || "NEXT MEMORY →";

  // Trigger festive confetti burst on scroll unroll
  useEffect(() => {
    soundFx.playUnroll();
    const timer = setTimeout(() => {
      try {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.25 },
          colors: ['#386188', '#83C5BE', '#f1b581', '#FFE5EC']
        });
      } catch (e) {}
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Gallery polaroid items inside scroll
  const gallery = Array.isArray(story?.gallery) && story.gallery.length > 0
    ? story.gallery.map((g, idx) => ({
        id: `g${idx}`,
        label: g.caption || g.label || "Memory",
        imageUrl: g.image || g.url || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80",
        tapeColor: g.tapeColor || (idx % 2 === 0 ? "#f1b581" : "#aed48f"),
        angle: (idx % 2 === 0 ? -3 : 3) * (idx + 1)
      }))
    : [
        { id: 'g1', label: storyDecorations?.polaroid1Label || "Coffee Snobs '23", imageUrl: storyDecorations?.polaroid1Image || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80", tapeColor: storyDecorations?.polaroid1Tape || "#f1b581", angle: -4 },
        { id: 'g2', label: storyDecorations?.polaroid2Label || "Inside Jokes", imageUrl: storyDecorations?.polaroid2Image || "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80", tapeColor: storyDecorations?.polaroid2Tape || "#aed48f", angle: 3 },
        { id: 'g3', label: storyDecorations?.polaroid3Label || "Memories", imageUrl: storyDecorations?.polaroid3Image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", tapeColor: storyDecorations?.polaroid3Tape || "#e89e9e", angle: -2 },
        { id: 'g4', label: storyDecorations?.polaroid4Label || "Summer Summit", imageUrl: storyDecorations?.polaroid4Image || "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&q=80", tapeColor: storyDecorations?.polaroid4Tape || "#85cbcf", angle: 4 }
      ];

  const handleNext = () => {
    soundFx.playClick();
    if (onNavigate) {
      onNavigate(config?.next || 'page-gallery');
    }
  };

  // Staggered motion variants
  const scrollContainerVariants = {
    hidden: { scaleY: 0.05, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.95,
        ease: [0.175, 0.885, 0.32, 1.15],
        when: "beforeChildren",
        staggerChildren: 0.18
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  return (
    <div className={`mv-letter-page ${isInsideStudio ? 'inside-studio-canvas' : ''}`}>
      {/* 8-Layered Scrapbook Background */}
      <ScrapbookBackground isInsideStudio={isInsideStudio} />

      {/* Top Left Navigation Vault Badge */}
      {!isInsideStudio && (
        <div className="mv-badge">
          <span>📁</span>
          <span>FRIENDSHIP VAULT '24: NEW DISCOVERY</span>
        </div>
      )}

      {/* Header Title Section */}
      <motion.header
        className="mv-header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="mv-title-box">
          <motion.span
            className="mv-confetti mv-c-left"
            animate={{ rotate: [-15, -5, -15], scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🎉
          </motion.span>
          <h1
            className="mv-title"
            onClick={() => onElementClick && onElementClick('title')}
            style={{ cursor: 'pointer' }}
          >
            {title}
          </h1>
          <motion.span
            className="mv-confetti mv-c-right"
            animate={{ rotate: [15, 25, 15], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            ✨
          </motion.span>
        </div>
      </motion.header>

      {/* Outer Corner Polaroids & Sticky Notes (Desktop / Tablet Screen Decor) */}
      {!isInsideStudio && (
        <>
          <Polaroid
            className="mv-pos-tl"
            image={gallery[0].imageUrl}
            caption={gallery[0].label}
            rotation={-8}
            tapeColor={gallery[0].tapeColor}
            onClick={() => onElementClick && onElementClick('polaroid1')}
          />
          <Polaroid
            className="mv-pos-tr"
            image={gallery[1].imageUrl}
            caption={gallery[1].label}
            rotation={7}
            tapeColor={gallery[1].tapeColor}
            onClick={() => onElementClick && onElementClick('polaroid2')}
          />
          <Polaroid
            className="mv-pos-bl"
            image={gallery[2].imageUrl}
            caption={gallery[2].label}
            rotation={6}
            tapeColor={gallery[2].tapeColor}
            onClick={() => onElementClick && onElementClick('polaroid3')}
          />
          <Polaroid
            className="mv-pos-br"
            image={gallery[3].imageUrl}
            caption={gallery[3].label}
            rotation={-6}
            tapeColor={gallery[3].tapeColor}
            onClick={() => onElementClick && onElementClick('polaroid4')}
          />

          <StickyNote
            className="mv-note-l1"
            text={storyDecorations?.note1Text || "where is our photo??"}
            rotation={-5}
            tapeColor="#f2bd92"
            onClick={() => onElementClick && onElementClick('note1')}
          />

          <StickyNote
            className="mv-note-l2"
            text={storyDecorations?.note2Text || "what is your memorie??"}
            rotation={-3}
            tapeColor="#aed48f"
            onClick={() => onElementClick && onElementClick('note2')}
          />

          <StickyNote
            className="mv-note-r1"
            text={storyDecorations?.note3Text || "code names!"}
            rotation={4}
            tapeColor="#e89e9e"
            onClick={() => onElementClick && onElementClick('note3')}
          />
        </>
      )}

      {/* Center Vintage Parchment Scroll */}
      <main className="mv-scroll-viewport">
        <ScrollPaper variants={scrollContainerVariants}>
          {/* Section 1: The Story of Us */}
          <motion.section className="mv-section" variants={itemVariants}>
            <motion.div
              className="mv-icon-box"
              onClick={() => onElementClick && onElementClick('icon1')}
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              {icon1}
            </motion.div>
            <div className="mv-section-body">
              <h3
                onClick={() => onElementClick && onElementClick('section1Title')}
                style={{ cursor: 'pointer' }}
              >
                {storyTitle}
              </h3>
              <p
                onClick={() => onElementClick && onElementClick('section1Text')}
                style={{ cursor: 'pointer' }}
              >
                {storyText}
              </p>
            </div>
          </motion.section>

          {/* Section 2: Unforgettable Moments */}
          <motion.section className="mv-section" variants={itemVariants}>
            <motion.div
              className="mv-icon-box"
              style={{ background: '#FFD2D7', cursor: 'pointer' }}
              onClick={() => onElementClick && onElementClick('icon2')}
              whileHover={{ scale: 1.15, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              {icon2}
            </motion.div>
            <div className="mv-section-body" style={{ width: '100%' }}>
              <h3
                onClick={() => onElementClick && onElementClick('section2Title')}
                style={{ cursor: 'pointer' }}
              >
                {section2Title}
              </h3>
              <ul className="mv-moments-list">
                {bulletPoints.map((item, idx) => (
                  <motion.li
                    key={idx}
                    onClick={() => onElementClick && onElementClick(`moment-${idx}`)}
                    style={{ cursor: 'pointer' }}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.12 }}
                    whileHover={{ x: 4 }}
                  >
                    <motion.span
                      className="mv-checkbox"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + idx * 0.12, type: "spring", stiffness: 400 }}
                    >
                      ✓
                    </motion.span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Section 3: In-Scroll Mini Polaroid Photo Gallery */}
          <motion.div className="mv-mini-gallery" variants={itemVariants}>
            {gallery.map((item, idx) => (
              <motion.div
                key={item.id}
                className="mv-decor-polaroid"
                style={{ position: 'relative', width: '100%', padding: '4px 4px 10px 4px', border: '2px solid #2C2523', transform: `rotate(${item.angle}deg)` }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
                whileHover={{ scale: 1.12, rotate: 0, y: -6 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onElementClick && onElementClick(item.id)}
              >
                <Tape color={item.tapeColor} style={{ top: '-6px', left: '50%', width: '36px', height: '10px' }} />
                <img src={item.imageUrl} alt={item.label} style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }} />
                <span className="caption" style={{ fontSize: '0.85rem', marginTop: '3px' }}>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </ScrollPaper>
      </main>

      {/* Footer Bar */}
      <motion.footer
        className="mv-footer"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span
          className="mv-footer-text"
          onClick={() => onElementClick && onElementClick('footer')}
          style={{ cursor: 'pointer' }}
        >
          Created with love, just for us.
        </span>

        <motion.button
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.94, y: 2 }}
          onClick={handleNext}
          className="mv-next-btn"
        >
          <span>{buttonText}</span>
        </motion.button>
      </motion.footer>
    </div>
  );
}
