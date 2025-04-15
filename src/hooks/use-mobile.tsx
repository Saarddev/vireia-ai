
import * as React from "react"

const BREAKPOINTS = {
  mobile: 640,  // sm
  tablet: 768,  // md
  desktop: 1024, // lg
  wide: 1600    // xl
} as const;

export function useIsMobile() {
  const [screenSize, setScreenSize] = React.useState<{
    isMobile: boolean,
    isTablet: boolean,
    isDesktop: boolean,
    isWide: boolean
  }>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isWide: false
  });

  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.desktop,
        isDesktop: width >= BREAKPOINTS.desktop && width < BREAKPOINTS.wide,
        isWide: width >= BREAKPOINTS.wide
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return {
    ...screenSize,
    isMobile: screenSize.isMobile
  };
}
