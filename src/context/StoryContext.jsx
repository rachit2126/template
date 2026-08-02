// Memory Vault Studio - Global React Context Provider

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTheme } from '../themes/themes';
import { interpolateStoryConfig, loadSavedStoryProgress, saveStoryProgress } from '../core/StoryEngine/StoryEngine';
import { soundFx } from '../sounds/soundEngine';

const StoryContext = createContext();

export const StoryProvider = ({ children, initialStoryData }) => {
  const [rawStory, setRawStory] = useState(() => {
    return loadSavedStoryProgress() || initialStoryData;
  });

  const [interpolatedStory, setInterpolatedStory] = useState(() => {
    return interpolateStoryConfig(rawStory);
  });

  const [currentPageId, setCurrentPageId] = useState(() => {
    return interpolatedStory.pages?.[0]?.id || 'page-vault';
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [historyStack, setHistoryStack] = useState([]);

  // Recalculate interpolated story whenever raw story changes
  useEffect(() => {
    const interpolated = interpolateStoryConfig(rawStory);
    setInterpolatedStory(interpolated);
    saveStoryProgress(rawStory);
  }, [rawStory]);

  // Active theme properties
  const currentThemeObj = getTheme(interpolatedStory.theme);

  // Background music initialization
  useEffect(() => {
    if (interpolatedStory.settings?.bgMusicEnabled && interpolatedStory.settings?.bgMusicUrl) {
      soundFx.playBgMusic(interpolatedStory.settings.bgMusicUrl);
    }
    return () => {
      soundFx.stopBgMusic();
    };
  }, [interpolatedStory.settings?.bgMusicUrl, interpolatedStory.settings?.bgMusicEnabled]);

  const navigateTo = (targetPageId) => {
    if (!targetPageId) return;
    setHistoryStack((prev) => [...prev, currentPageId]);
    setCurrentPageId(targetPageId);
  };

  const restartStory = () => {
    setHistoryStack([]);
    if (interpolatedStory.pages?.[0]?.id) {
      setCurrentPageId(interpolatedStory.pages[0].id);
    }
  };

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const updateStory = (newConfig) => {
    setRawStory(newConfig);
    // If current page no longer exists in updated pages, reset to first page
    if (!newConfig.pages.some((p) => p.id === currentPageId)) {
      setCurrentPageId(newConfig.pages[0]?.id || 'page-vault');
    }
  };

  const exportStoryJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rawStory, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${rawStory.meta?.title || 'story'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importStoryJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      updateStory(parsed);
      return true;
    } catch (e) {
      alert("Invalid JSON format. Please upload a valid story.json file.");
      return false;
    }
  };

  return (
    <StoryContext.Provider
      value={{
        rawStory,
        story: interpolatedStory,
        currentPageId,
        currentTheme: currentThemeObj,
        isAdminOpen,
        isMuted,
        setIsAdminOpen,
        navigateTo,
        restartStory,
        toggleSound,
        updateStory,
        exportStoryJSON,
        importStoryJSON
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};
