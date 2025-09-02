import { useState, useEffect } from 'react';

// Bootstrap breakpoints
const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};

export const useBootstrapBreakpoint = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [breakpoint, setBreakpoint] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });

      // Determine current Bootstrap breakpoint
      if (width >= BREAKPOINTS.xxl) {
        setBreakpoint('xxl');
      } else if (width >= BREAKPOINTS.xl) {
        setBreakpoint('xl');
      } else if (width >= BREAKPOINTS.lg) {
        setBreakpoint('lg');
      } else if (width >= BREAKPOINTS.md) {
        setBreakpoint('md');
      } else if (width >= BREAKPOINTS.sm) {
        setBreakpoint('sm');
      } else {
        setBreakpoint('xs');
      }
    };

    // Set initial values
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...windowSize,
    breakpoint,
    isMobile: windowSize.width < BREAKPOINTS.md,
    isTablet: windowSize.width >= BREAKPOINTS.md && windowSize.width < BREAKPOINTS.lg,
    isDesktop: windowSize.width >= BREAKPOINTS.lg,
  };
};

export default useBootstrapBreakpoint;
