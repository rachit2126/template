// Memory Vault Studio - Complete Visual & AI Admin Studio Editor

import React, { useState } from 'react';
import { useStory } from '../context/StoryContext';
import { THEME_PRESETS } from '../themes/themes';
import styles from '../styles/story.module.css';

export default function AdminStudio() {
  const { rawStory, updateStory, exportStoryJSON, importStoryJSON, setIsAdminOpen } = useStory();

  const [activeTab, setActiveTab] = useState('visual'); // 'visual' | 'json' | 'ai'
  const [jsonText, setJsonText] = useState(JSON.stringify(rawStory, null, 2));
  const [jsonError, setJsonError] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Form State for Visual Editor
  const [metaTitle, setMetaTitle] = useState(rawStory.meta?.title || '');
  const [receiverName, setReceiverName] = useState(rawStory.variables?.receiverName || '');
  const [senderName, setSenderName] = useState(rawStory.variables?.senderName || '');
  const [pinCode, setPinCode] = useState(rawStory.pin || '1234');
  const [selectedTheme, setSelectedTheme] = useState(rawStory.theme || 'friendship');
  const [pagesList, setPagesList] = useState(rawStory.pages || []);

  const handleSaveVisual = () => {
    const updated = {
      ...rawStory,
      meta: { ...rawStory.meta, title: metaTitle },
      theme: selectedTheme,
      pin: pinCode,
      variables: {
        ...rawStory.variables,
        receiverName,
        senderName
      },
      pages: pagesList
    };
    updateStory(updated);
    setIsAdminOpen(false);
  };

  const handleSaveJSON = () => {
    try {
      const parsed = JSON.parse(jsonText);
      updateStory(parsed);
      setJsonError('');
      setIsAdminOpen(false);
    } catch (err) {
      setJsonError('Invalid JSON syntax. Please check formatting.');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      importStoryJSON(event.target.result);
      setIsAdminOpen(false);
    };
    reader.readAsText(file);
  };

  const handleGenerateAiStory = () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAi(true);

    setTimeout(() => {
      const isAnniversary = aiPrompt.toLowerCase().includes('anniversary') || aiPrompt.toLowerCase().includes('love');
      const generatedTheme = isAnniversary ? 'love' : 'birthday';

      const generated = {
        meta: {
          title: aiPrompt.toUpperCase() + " STORY",
          author: "AI Assistant",
          created: "2026-08-02"
        },
        theme: generatedTheme,
        pin: "2026",
        variables: {
          receiverName: "Special One",
          senderName: "Me",
          year: "2026",
          tripLocation: "Romantic Getaway",
          insideJoke: "Midnight Ice Cream",
          favSong: "Our Song"
        },
        settings: {
          soundEnabled: true,
          bgMusicEnabled: true,
          particles: generatedTheme === 'love' ? 'hearts' : 'confetti'
        },
        pages: [
          {
            id: "page-vault",
            type: "vault",
            title: "SECRET MEMORY VAULT",
            subtitle: "ENTER SECRET PIN (2026)",
            hint: "PIN is 2026",
            next: "page-letter"
          },
          {
            id: "page-letter",
            type: "letter",
            title: "A SPECIAL MESSAGE FOR YOU",
            section1Title: "OUR JOURNEY TOGETHER",
            section1Text: `Generated Story for: ${aiPrompt}\nThank you for being in my life!`,
            buttonText: "OPEN GALLERY →",
            next: "page-gallery"
          },
          {
            id: "page-gallery",
            type: "gallery",
            title: "MEMORIES WE CHERISH",
            subtitle: "Click to zoom into photos",
            images: [
              {
                id: "i1",
                url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
                caption: "Special Day",
                rotation: -3
              }
            ],
            buttonText: "GO TO FINALE →",
            next: "page-ending"
          },
          {
            id: "page-ending",
            type: "ending",
            title: "FOREVER MEMORIES ❤️",
            message: "Story created with Memory Vault Studio AI",
            buttonText: "REPLAY STORY ↻"
          }
        ]
      };

      updateStory(generated);
      setIsGeneratingAi(false);
      setIsAdminOpen(false);
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '750px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
          color: '#1E293B'
        }}
      >
        {/* Editor Top Bar */}
        <div
          style={{
            background: '#F1F5F9',
            padding: '14px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>🛠️ Memory Vault Admin Studio</h3>
          <button
            style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.4rem' }}
            onClick={() => setIsAdminOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', background: '#FAFAFA' }}>
          {[
            { id: 'visual', label: '🎨 Visual Editor' },
            { id: 'json', label: '💻 Live JSON Code' },
            { id: 'ai', label: '🤖 AI Story Generator' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #4CAF50' : 'none',
                background: activeTab === tab.id ? '#FFF' : 'transparent',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor Body */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {activeTab === 'visual' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Story Title:</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Receiver Name:</label>
                  <input
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Sender Name:</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Vault Secret PIN:</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Theme Preset:</label>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                  >
                    {Object.values(THEME_PRESETS).map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.icon} {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '6px' }}>Page Nodes ({pagesList.length} total):</label>
                <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '10px' }}>
                  {pagesList.map((p, idx) => (
                    <div key={p.id || idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed #E2E8F0' }}>
                      <span>{idx + 1}. <strong>{p.type.toUpperCase()}</strong> ({p.id})</span>
                      <span>{p.title || 'Untitled Page'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'json' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {jsonError && <p style={{ color: 'red', margin: '0 0 10px 0' }}>{jsonError}</p>}
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                style={{
                  width: '100%',
                  height: '350px',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  resize: 'none'
                }}
              />
            </div>
          )}

          {activeTab === 'ai' && (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🤖</div>
              <h3 style={{ margin: '0 0 10px 0' }}>AI Story Generator</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>
                Describe any story theme (e.g., "Create a romantic 1st anniversary story with sunset memories")
              </p>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Enter your story prompt here..."
                style={{ width: '100%', height: '90px', borderRadius: '6px', padding: '10px', border: '1px solid #CBD5E1', marginBottom: '15px' }}
              />
              <button
                className={styles.sketchyBtn}
                style={{ marginTop: 0 }}
                disabled={isGeneratingAi}
                onClick={handleGenerateAiStory}
              >
                {isGeneratingAi ? 'GENERATING STORY JSON...' : 'GENERATE FULL STORY ⚡'}
              </button>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div style={{ padding: '15px 20px', background: '#F1F5F9', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <input type="file" accept=".json" id="import-file" style={{ display: 'none' }} onChange={handleFileUpload} />
            <label htmlFor="import-file" style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#0284C7', textDecoration: 'underline', marginRight: '15px' }}>
              📥 Import JSON File
            </label>
            <span style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#0284C7', textDecoration: 'underline' }} onClick={exportStoryJSON}>
              📤 Export JSON File
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: '#CBD5E1' }} onClick={() => setIsAdminOpen(false)}>
              Cancel
            </button>
            <button
              style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: '#4CAF50', color: '#FFF', fontWeight: 'bold' }}
              onClick={activeTab === 'json' ? handleSaveJSON : handleSaveVisual}
            >
              Save & Apply Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
