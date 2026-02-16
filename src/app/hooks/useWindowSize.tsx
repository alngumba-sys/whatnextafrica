import { useState, useEffect } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function getResponsiveColumns(width: number) {
  // For KPI cards
  if (width < 640) return 1; // mobile
  if (width < 1024) return 2; // tablet
  if (width < 1536) return 3; // laptop
  return 6; // large desktop - show all 6 in a row
}

export function getQuickActionColumns(width: number) {
  if (width < 640) return 2; // mobile
  if (width < 768) return 3; // small tablet
  if (width < 1024) return 3; // tablet
  return 5; // desktop
}

export function getChartWidth(width: number, hasSidebar: boolean = true) {
  // Account for sidebar on desktop
  const sidebarWidth = hasSidebar && width >= 1024 ? 256 : 0;
  const padding = width < 640 ? 32 : width < 768 ? 40 : 64;
  return width - sidebarWidth - padding;
}

export function getChartHeight(width: number) {
  if (width < 640) return 280; // mobile
  if (width < 1024) return 320; // tablet
  return 400; // desktop
}

export function getProjectCardWidth(width: number) {
  if (width < 640) return width - 64; // mobile: full width minus padding
  if (width < 768) return 280; // small tablet
  if (width < 1024) return 320; // tablet
  return 320; // desktop - fixed comfortable width
}

export function isMobile(width: number) {
  return width < 640;
}

export function isTablet(width: number) {
  return width >= 640 && width < 1024;
}

export function isDesktop(width: number) {
  return width >= 1024;
}