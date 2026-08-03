import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function Inspector({ selectedPage, onPageFieldChange, storyTitle, onTitleChange, storyPin, onPinChange }) {
  if (!selectedPage) return <div style={{ color: '#64748B' }}>No page selected</div>;

  const handleMomentChange = (index, value) => {
    const currentPoints = Array.isArray(selectedPage.bulletPoints) ? [...selectedPage.bulletPoints] : [];
    currentPoints[index] = value;
    onPageFieldChange('bulletPoints', currentPoints);
  };

  const handleAddMoment = () => {
    const currentPoints = Array.isArray(selectedPage.bulletPoints) ? [...selectedPage.bulletPoints] : [];
    currentPoints.push('New Moment');
    onPageFieldChange('bulletPoints', currentPoints);
  };

  const handleDeleteMoment = (index) => {
    const currentPoints = Array.isArray(selectedPage.bulletPoints) ? [...selectedPage.bulletPoints] : [];
    currentPoints.splice(index, 1);
    onPageFieldChange('bulletPoints', currentPoints);
  };

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

        {/* Specific Fields for Scroll Letter Page (type: "letter") */}
        {selectedPage.type === 'letter' && (
          <>
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Section 1 Title</label>
              <input
                type="text"
                value={selectedPage.section1Title || 'THE STORY OF US.'}
                onChange={(e) => onPageFieldChange('section1Title', e.target.value)}
                style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Section 1 Paragraph</label>
              <textarea
                value={selectedPage.section1Text || ''}
                onChange={(e) => onPageFieldChange('section1Text', e.target.value)}
                rows={3}
                style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', boxSizing: 'border-box', fontFamily: 'sans-serif' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Section 2 Title</label>
              <input
                type="text"
                value={selectedPage.section2Title || 'UNFORGETTABLE MOMENTS.'}
                onChange={(e) => onPageFieldChange('section2Title', e.target.value)}
                style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', boxSizing: 'border-box' }}
              />
            </div>

            {/* Dynamic Moments List */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Unforgettable Moments List</label>
                <button
                  onClick={handleAddMoment}
                  style={{ background: '#10B981', border: 'none', borderRadius: '4px', padding: '2px 8px', color: '#FFF', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Plus className="w-3 h-3" /> Add Moment
                </button>
              </div>

              {(selectedPage.bulletPoints || ["Road Trip '22 (Check)", "The \"Pancakes\" Incident (Classic)", "Secret Handshake Mastered (Level 100)"]).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleMomentChange(idx, e.target.value)}
                    style={{ flex: 1, background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '6px 8px', color: '#FFF', fontSize: '0.8rem' }}
                  />
                  <button
                    onClick={() => handleDeleteMoment(idx)}
                    style={{ background: '#EF4444', border: 'none', borderRadius: '6px', padding: '6px', color: '#FFF', cursor: 'pointer' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </>
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
