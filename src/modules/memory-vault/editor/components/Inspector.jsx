import React from 'react';

export default function Inspector({ selectedPage, onPageFieldChange, storyTitle, onTitleChange, storyPin, onPinChange }) {
  if (!selectedPage) return <div style={{ color: '#64748B' }}>No page selected</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Inspector: {selectedPage.type?.toUpperCase()}
      </span>

      {/* Global Story Header */}
      <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '8px', padding: '12px' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
          STORY TITLE
        </label>
        <input
          type="text"
          value={storyTitle || ''}
          onChange={(e) => onTitleChange(e.target.value)}
          style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', marginBottom: '12px', boxSizing: 'border-box' }}
        />

        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
          VAULT PIN (4 DIGITS)
        </label>
        <input
          type="text"
          maxLength={4}
          value={storyPin || '1234'}
          onChange={(e) => onPinChange(e.target.value)}
          style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', boxSizing: 'border-box' }}
        />
      </div>

      {/* Selected Page Inspector Fields */}
      <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981' }}>
          PAGE CONTENT ({selectedPage.id})
        </span>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Main Title</label>
          <input
            type="text"
            value={selectedPage.title || ''}
            onChange={(e) => onPageFieldChange('title', e.target.value)}
            style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', boxSizing: 'border-box' }}
          />
        </div>

        {selectedPage.subtitle !== undefined && (
          <div>
            <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Subtitle</label>
            <input
              type="text"
              value={selectedPage.subtitle || ''}
              onChange={(e) => onPageFieldChange('subtitle', e.target.value)}
              style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', boxSizing: 'border-box' }}
            />
          </div>
        )}

        {selectedPage.buttonText !== undefined && (
          <div>
            <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Button Text</label>
            <input
              type="text"
              value={selectedPage.buttonText || ''}
              onChange={(e) => onPageFieldChange('buttonText', e.target.value)}
              style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', boxSizing: 'border-box' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
