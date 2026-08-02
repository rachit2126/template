// Memory Vault Studio - Physical Object Motion & Physics Engine

export const SPRING_PHYSICS = {
  tactileButton: { type: 'spring', stiffness: 400, damping: 25 },
  cardDrop: { type: 'spring', stiffness: 260, damping: 20 },
  polaroidBounce: { type: 'spring', stiffness: 300, damping: 15 },
  envelopeUnroll: { type: 'spring', stiffness: 180, damping: 22 },
  waxBreak: { type: 'spring', stiffness: 500, damping: 30 },
  chestOpen: { type: 'spring', stiffness: 200, damping: 18 },
  scratchReveal: { type: 'spring', stiffness: 350, damping: 25 }
};

export const calcRopeKnotTension = (dragX, dragY, targetX, targetY) => {
  const dx = targetX - dragX;
  const dy = targetY - dragY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const tension = Math.min(1, distance / 150);
  return { distance, tension };
};

export const generateWaxFragments = (count = 12) => {
  return Array.from({ length: count }, (_, idx) => ({
    id: idx,
    x: (Math.random() - 0.5) * 80,
    y: (Math.random() - 0.5) * 80,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.5 + 0.5
  }));
};
