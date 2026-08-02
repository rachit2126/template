// Memory Vault Studio - Core Story JSON Engine & Dynamic Variable Interpolator

export const interpolateText = (text, variables = {}) => {
  if (typeof text !== 'string') return text;
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match;
  });
};

export const interpolateStoryConfig = (storyData) => {
  if (!storyData || !storyData.pages) return storyData;
  const vars = storyData.variables || {};

  const processObject = (obj) => {
    if (typeof obj === 'string') {
      return interpolateText(obj, vars);
    }
    if (Array.isArray(obj)) {
      return obj.map(processObject);
    }
    if (obj !== null && typeof obj === 'object') {
      const newObj = {};
      for (const key in obj) {
        newObj[key] = processObject(obj[key]);
      }
      return newObj;
    }
    return obj;
  };

  return processObject(storyData);
};

export const loadSavedStoryProgress = () => {
  try {
    const saved = localStorage.getItem('memory_vault_story');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Could not load saved story from localStorage', e);
  }
  return null;
};

export const saveStoryProgress = (storyConfig) => {
  try {
    localStorage.setItem('memory_vault_story', JSON.stringify(storyConfig));
  } catch (e) {
    console.warn('Could not save story to localStorage', e);
  }
};
