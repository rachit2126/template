import { useState, useEffect } from 'react';

export function useDeviceType() {
  const [device, setDevice] = useState(() => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.matchMedia('(max-width: 767px)').matches) return 'mobile';
    if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) return 'tablet';
    return 'desktop';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');

    const updateDevice = () => {
      if (mobileQuery.matches) {
        setDevice('mobile');
      } else if (tabletQuery.matches) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    updateDevice();

    mobileQuery.addEventListener('change', updateDevice);
    tabletQuery.addEventListener('change', updateDevice);

    return () => {
      mobileQuery.removeEventListener('change', updateDevice);
      tabletQuery.removeEventListener('change', updateDevice);
    };
  }, []);

  return device;
}
