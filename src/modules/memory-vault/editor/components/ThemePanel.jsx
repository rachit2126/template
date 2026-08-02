import React from 'react';
import { Sparkles, Heart, Gift, Crown, Sun } from 'lucide-react';

const PRESET_THEMES = [
  { id: 'friendship', name: 'Friendship Vault', icon: '🤝', bg: '#f6f0df', primary: '#2C1A0E', desc: 'Warm vintage scrapbook feel' },
  { id: 'love', name: 'Romantic Proposal', icon: '💖', bg: '#fff0f3', primary: '#590d22', desc: 'Soft pinks & rose gold glow' },
  { id: 'birthday', name: 'Birthday Bash', icon: '🎉', bg: '#f0f9ff', primary: '#0c4a6e', desc: 'Vibrant party colors' },
  { id: 'wedding', name: 'Golden Wedding', icon: '💍', bg: '#fafaf9', primary: '#44403c', desc: 'Elegant champagne theme' },
  { id: 'holiday', name: 'Holiday Magic', icon: '🎄', bg: '#f0fdf4', primary: '#14532d', desc: 'Warm cozy holiday theme' }
];

export default function ThemePanel({ currentTheme = 'friendship', onSelectTheme }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Scrapbook Preset Themes
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {PRESET_THEMES.map((t) => {
          const isSelected = currentTheme === t.id;
          return (
            <div
              key={t.id}
              onClick={() => onSelectTheme(t.id)}
              style={{
                background: isSelected ? '#334155' : '#0F172A',
                border: isSelected ? '2px solid #10B981' : '1px solid #1E293B',
                borderRadius: '12px',
                padding: '12px 14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: isSelected ? '#FFF' : '#E2E8F0' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {t.desc}
                  </div>
                </div>
              </div>

              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: t.bg, border: `2px solid ${t.primary}` }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
