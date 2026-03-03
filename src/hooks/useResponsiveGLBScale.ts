import { useEffect, useState } from "react";

interface UseResponsiveGLBScaleOptions {
  mobileMinScale?: number;
  mobileMaxScale?: number;
  largeMinScale?: number;
  largeMaxScale?: number;
  largeScreenMinWidth?: number;
}

export default function useResponsiveGLBScale({
  mobileMinScale = 0.4,
  mobileMaxScale = 0.6,
  largeMinScale = 0.75,
  largeMaxScale = 1,
  largeScreenMinWidth = 1024,
}: UseResponsiveGLBScaleOptions = {}) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(
      `(min-width: ${largeScreenMinWidth}px)`,
    );

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsLargeScreen(
        "matches" in event
          ? event.matches
          : (event as MediaQueryList).matches,
      );
    };

    handleChange(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [largeScreenMinWidth]);

  return isLargeScreen
    ? { minScale: largeMinScale, maxScale: largeMaxScale }
    : { minScale: mobileMinScale, maxScale: mobileMaxScale };
}