"use client";

import { useMediaQuery } from "react-responsive";

export default function useDetect() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1023px)",
  });

  const deviceType = isMobile ? "mo" : isTablet ? "tb" : "pc";
  return deviceType;
}
export function useDisplaySize() {
  const windowSize = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  };
  return windowSize;
}
