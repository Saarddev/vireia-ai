
import * as React from "react"

const BREAKPOINTS = {
  mobile: 640,  // sm
  tablet: 768,  // md
  desktop: 1024 // lg
} as const

export function useIsMobile() {
  const [screenSize, setScreenSize] = React.useState<{
    isMobile: boolean,
    isTablet: boolean,
    isDesktop: boolean
  }>({
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });

  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.desktop,
        isDesktop: width >= BREAKPOINTS.desktop
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Return both the full object and a simple boolean for backward compatibility
  return {
    ...screenSize,
    isMobile: screenSize.isMobile
  };
}
