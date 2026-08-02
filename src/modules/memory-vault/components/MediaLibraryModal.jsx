import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Image as ImageIcon, Check, X, Search, Plus } from 'lucide-react';
import { MediaStore } from '../services/MediaStore';

export function MediaControl({ label, assetIdOrUrl, onSelectAsset, onRemoveAsset }) {
  const [resolvedUrl, setResolvedUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (assetIdOrUrl) {
      MediaStore.getUrl(assetIdOrUrl).then((url) => {
        if (isMounted) setResolvedUrl(url);
      });
    } else {
      setResolvedUrl(null);
    }
    return () => { isMounted = false; };
  }, [assetIdOrUrl]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploaded = await MediaStore.upload(file);
    if (uploaded && uploaded.assetId) {
      onSelectAsset(uploaded.assetId, uploaded.url);
    }
  };

  return (
    <div style={{ background: '#0F172A', padding: '12px', borderRadius: '10px', border: '1px solid #334155' }}>
      <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '8px' }}>
        {label.toUpperCase()}:
      </label>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {/* Thumbnail Box */}
        <div style={{ width: '64px', height: '64px', background: '#1E293B', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {resolvedUrl ? (
            <img src={resolvedUrl} alt="Asset Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-500" />
          )}
        </div>

        {/* Control Buttons */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <input
            type="file"
            accept="image/*"
            id={`file-input-${label.replace(/\s+/g, '-')}`}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <label
            htmlFor={`file-input-${label.replace(/\s+/g, '-')}`}
            style={{
              background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
              color: '#FFF',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: 800,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              textAlign: 'center'
            }}
          >
            <Upload className="w-3.5 h-3.5" /> Upload Image
          </label>

          {resolvedUrl && (
            <button
              onClick={onRemoveAsset}
              style={{ background: '#334155', color: '#EF4444', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
            >
              <Trash2 className="w-3 h-3" /> Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function MediaLibraryModal({ isOpen, onClose, onSelectAsset }) {
  const [mediaList, setMediaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen]);

  const loadMedia = async () => {
    const items = await MediaStore.list();
    setMediaList(items);
  };

  const handleUploadNew = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploaded = await MediaStore.upload(file);
    if (uploaded) {
      loadMedia();
      if (onSelectAsset) onSelectAsset(uploaded.assetId, uploaded.url);
    }
  };

  const handleDeleteItem = async (assetId, e) => {
    e.stopPropagation();
    await MediaStore.delete(assetId);
    loadMedia();
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: '#1E293B', border: '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '750px', height: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
        
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0F172A' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ImageIcon className="w-5 h-5 text-purple-400" /> Media Library (IndexedDB Offline)
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1.2rem' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid #334155', display: 'flex', gap: '12px', alignItems: 'center', background: '#1E293B' }}>
          <input
            type="file"
            accept="image/*"
            id="modal-upload-input"
            style={{ display: 'none' }}
            onChange={handleUploadNew}
          />
          <label htmlFor="modal-upload-input" style={{ background: '#8B5CF6', color: '#FFF', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus className="w-4 h-4" /> Upload New Asset
          </label>
        </div>

        {/* Media Grid */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {mediaList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p style={{ fontWeight: 'bold' }}>No uploaded media assets yet.</p>
              <p style={{ fontSize: '0.8rem' }}>Upload files from your device to save them locally into IndexedDB.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
              {mediaList.map((item) => (
                <div
                  key={item.assetId}
                  onClick={() => {
                    if (onSelectAsset) onSelectAsset(item.assetId, item.url);
                    onClose();
                  }}
                  style={{
                    background: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    group: true
                  }}
                >
                  <div style={{ height: '110px', background: '#1E293B', position: 'relative' }}>
                    <img src={item.url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      onClick={(e) => handleDeleteItem(item.assetId, e)}
                      style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(239, 68, 68, 0.9)', border: 'none', color: '#FFF', padding: '4px', borderRadius: '4px', cursor: 'pointer' }}
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div style={{ padding: '8px', fontSize: '0.7rem', color: '#CBD5E1', truncate: true }}>
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
