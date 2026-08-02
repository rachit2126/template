import React from 'react';
import { Plus, ArrowUp, ArrowDown, Copy, Trash2, Layers } from 'lucide-react';

const VERSION_1_TEMPLATES = [
  { type: 'vault', label: '1. Vault Login', icon: '🔒', defaultTitle: 'ACCESSING OUR VAULT', defaultSubtitle: 'ENTER YOUR SECRET PIN (4 DIGITS)' },
  { type: 'envelope', label: '2. Envelope + Wax Seal', icon: '✉️', defaultTitle: 'A SECRET FOR YOU', defaultSubtitle: 'TAP THE WAX SEAL TO OPEN' },
  { type: 'letter', label: '3. Scroll Letter', icon: '📜', defaultTitle: 'OUR MEMORY JOURNEY', defaultSubtitle: 'A SPECIAL LETTER FOR YOU' },
  { type: 'gallery', label: '4. Memory Gallery', icon: '🖼️', defaultTitle: 'OUR PHOTO ALBUM', defaultSubtitle: 'OUR FAVORITE MOMENTS' },
  { type: 'ending', label: '5. Ending Finale', icon: '❤️', defaultTitle: 'THANK YOU FOR BEING YOU', defaultSubtitle: 'FOREVER & ALWAYS' }
];

export default function PagesPanel({ pages = [], selectedPageId, onSelectPage, onAddPage, onDuplicatePage, onDeletePage, onMovePage }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Pages ({pages.length})
        </span>
      </div>

      {/* Pages List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {pages.map((p, idx) => {
          const isSelected = p.id === selectedPageId;
          const tmpl = VERSION_1_TEMPLATES.find((t) => t.type === p.type) || VERSION_1_TEMPLATES[0];

          return (
            <div
              key={p.id}
              onClick={() => onSelectPage(p.id)}
              style={{
                background: isSelected ? '#334155' : '#0F172A',
                border: isSelected ? '2px solid #10B981' : '1px solid #1E293B',
                borderRadius: '10px',
                padding: '10px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>{tmpl.icon}</span>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isSelected ? '#FFF' : '#CBD5E1' }}>
                    {idx + 1}. {p.title || tmpl.label}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                    {p.type}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  onClick={(e) => { e.stopPropagation(); onMovePage(idx, -1); }}
                  disabled={idx === 0}
                  style={{ opacity: idx === 0 ? 0.2 : 0.7, background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', minHeight: '36px', minWidth: '36px' }}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onMovePage(idx, 1); }}
                  disabled={idx === pages.length - 1}
                  style={{ opacity: idx === pages.length - 1 ? 0.2 : 0.7, background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', minHeight: '36px', minWidth: '36px' }}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDuplicatePage(p.id); }}
                  style={{ opacity: 0.7, background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', minHeight: '36px', minWidth: '36px' }}
                >
                  <Copy className="w-4 h-4" />
                </button>
                {pages.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeletePage(p.id); }}
                    style={{ opacity: 0.7, background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', minHeight: '36px', minWidth: '36px' }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Page Dropdown / Buttons */}
      <div style={{ marginTop: '8px', borderTop: '1px solid #334155', paddingTop: '12px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
          + Add Version 1 Page
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {VERSION_1_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.type}
              onClick={() => onAddPage(tmpl)}
              style={{
                background: '#0F172A',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '8px 10px',
                color: '#FFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '44px'
              }}
            >
              <span>{tmpl.icon}</span>
              <span>{tmpl.type.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
