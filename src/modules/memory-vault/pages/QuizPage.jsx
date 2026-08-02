import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { soundFx } from '../sounds/soundEngine';
import styles from '../styles/story.module.css';

export default function QuizPage({ config, onNavigate }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);

  const questions = config.questions || [];
  const currentQ = questions[currentQIndex] || questions[0];

  const handleSelectOption = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);

    if (idx === currentQ.correctIndex) {
      soundFx.playSuccess();
      setScore((s) => s + 1);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } else {
      soundFx.playClick();
    }
  };

  const handleNextQ = () => {
    soundFx.playClick();
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOpt(null);
    } else {
      onNavigate(config.next);
    }
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
      <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: '5px 0 20px 0' }}>
        Question {currentQIndex + 1} of {questions.length} | Score: {score}
      </p>

      <div className={styles.vaultCard} style={{ padding: '25px 20px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{currentQ?.question}</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {currentQ?.options?.map((opt, idx) => {
            const isCorrect = idx === currentQ.correctIndex;
            const isSelected = selectedOpt === idx;
            let btnBg = '#ffffff';
            if (selectedOpt !== null) {
              if (isCorrect) btnBg = '#BCE3C5';
              else if (isSelected) btnBg = '#F1B3B3';
            }

            return (
              <button
                key={idx}
                className={styles.numBtn}
                style={{
                  background: btnBg,
                  fontSize: '0.95rem',
                  padding: '12px',
                  textAlign: 'left'
                }}
                onClick={() => handleSelectOption(idx)}
              >
                {opt} {isSelected && (isCorrect ? ' ✅' : ' ❌')}
              </button>
            );
          })}
        </div>

        {selectedOpt !== null && (
          <button className={styles.sketchyBtn} style={{ width: '100%', marginTop: '20px' }} onClick={handleNextQ}>
            {currentQIndex < questions.length - 1 ? 'NEXT QUESTION →' : (config.buttonText || 'CONTINUE →')}
          </button>
        )}
      </div>
    </motion.div>
  );
}
