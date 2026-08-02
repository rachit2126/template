import React from 'react';
import { MediaControl } from '../../components/MediaLibraryModal';

export default function AssetsPanel({ decorations = {}, onDecorationChange, onOpenMediaLibrary }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Scrapbook Assets (IndexedDB)
        </span>
        <button
          onClick={onOpenMediaLibrary}
          style={{ background: '#3B82F6', border: 'none', borderRadius: '6px', padding: '6px 12px', color: '#FFF', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer' }}
        >
          📚 Open Library
        </button>
      </div>

      {/* Polaroid 1 */}
      <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '8px', padding: '12px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', display: 'block', marginBottom: '8px' }}>
          POLAROID 1 (TOP LEFT)
        </span>
        <input
          type="text"
          value={decorations.polaroid1Label || ''}
          onChange={(e) => onDecorationChange('polaroid1Label', e.target.value)}
          placeholder="Caption label..."
          style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', marginBottom: '8px', boxSizing: 'border-box' }}
        />
        <MediaControl
          label="POLAROID 1 IMAGE"
          value={decorations.polaroid1Image}
          onChange={(assetId) => onDecorationChange('polaroid1Image', assetId)}
        />
      </div>

      {/* Polaroid 2 */}
      <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '8px', padding: '12px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', display: 'block', marginBottom: '8px' }}>
          POLAROID 2 (TOP RIGHT)
        </span>
        <input
          type="text"
          value={decorations.polaroid2Label || ''}
          onChange={(e) => onDecorationChange('polaroid2Label', e.target.value)}
          placeholder="Caption label..."
          style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', marginBottom: '8px', boxSizing: 'border-box' }}
        />
        <MediaControl
          label="POLAROID 2 IMAGE"
          value={decorations.polaroid2Image}
          onChange={(assetId) => onDecorationChange('polaroid2Image', assetId)}
        />
      </div>

      {/* Polaroid 3 */}
      <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '8px', padding: '12px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', display: 'block', marginBottom: '8px' }}>
          POLAROID 3 (BOTTOM LEFT)
        </span>
        <input
          type="text"
          value={decorations.polaroid3Label || ''}
          onChange={(e) => onDecorationChange('polaroid3Label', e.target.value)}
          placeholder="Caption label..."
          style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', marginBottom: '8px', boxSizing: 'border-box' }}
        />
        <MediaControl
          label="POLAROID 3 IMAGE"
          value={decorations.polaroid3Image}
          onChange={(assetId) => onDecorationChange('polaroid3Image', assetId)}
        />
      </div>

      {/* Polaroid 4 */}
      <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '8px', padding: '12px' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', display: 'block', marginBottom: '8px' }}>
          POLAROID 4 (BOTTOM RIGHT)
        </span>
        <input
          type="text"
          value={decorations.polaroid4Label || ''}
          onChange={(e) => onDecorationChange('polaroid4Label', e.target.value)}
          placeholder="Caption label..."
          style={{ width: '100%', background: '#1E293B', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: '#FFF', fontSize: '0.85rem', marginBottom: '8px', boxSizing: 'border-box' }}
        />
        <MediaControl
          label="POLAROID 4 IMAGE"
          value={decorations.polaroid4Image}
          onChange={(assetId) => onDecorationChange('polaroid4Image', assetId)}
        />
      </div>
    </div>
  );
}
