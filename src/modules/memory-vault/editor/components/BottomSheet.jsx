import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronUp, ChevronDown } from 'lucide-react';

export default function BottomSheet({ isOpen, onClose, title, children, snapPoint = '60%' }) {
  const [currentSnap, setCurrentSnap] = useState(snapPoint); // 30%, 60%, 95%

  if (!isOpen) return null;

  const getSnapHeight = () => {
    switch (currentSnap) {
      case '30%': return '35vh';
      case '95%': return '92vh';
      case '60%':
      default: return '60vh';
    }
  };

  const cycleSnap = () => {
    if (currentSnap === '30%') setCurrentSnap('60%');
    else if (currentSnap === '60%') setCurrentSnap('95%');
    else setCurrentSnap('30%');
  };

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 300, pointerEvents: 'none' }}>
        {/* Darkened Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            pointerEvents: 'auto'
          }}
        />

        {/* Draggable Bottom Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: getSnapHeight(),
            background: '#1E293B',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            borderTop: '2px solid #334155',
            boxShadow: '0 -10px 30px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            pointerEvents: 'auto',
            transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Drag Handle & Header */}
          <div
            onClick={cycleSnap}
            style={{
              padding: '12px 16px 8px 16px',
              borderBottom: '1px solid #334155',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div style={{ width: '40px', height: '5px', background: '#475569', borderRadius: '3px', marginBottom: '8px' }} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFF', letterSpacing: '0.5px' }}>
                {title}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); cycleSnap(); }}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
                >
                  {currentSnap === '95%' ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  style={{ background: '#334155', border: 'none', borderRadius: '50%', color: '#FFF', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sheet Body Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', color: '#CBD5E1' }}>
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
