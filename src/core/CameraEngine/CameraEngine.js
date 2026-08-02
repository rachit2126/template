// Memory Vault Studio - Camera Engine for Movie-like Page Transitions

export const CAMERA_PRESETS = {
  default: { scale: 1, x: 0, y: 0, rotate: 0, filter: 'none' },
  zoomIn: { scale: 1.05, x: 0, y: -10, rotate: 0, filter: 'none' },
  panLeft: { scale: 1, x: -30, y: 0, rotate: -1, filter: 'none' },
  panRight: { scale: 1, x: 30, y: 0, rotate: 1, filter: 'none' },
  shutterFlash: { scale: 1.08, x: 0, y: 0, rotate: 0, filter: 'brightness(1.5)' },
  dramaticVault: { scale: 0.98, x: 0, y: 5, rotate: 0, filter: 'none' }
};

export const getCameraTransition = (type) => {
  return CAMERA_PRESETS[type] || CAMERA_PRESETS.default;
};
