import { useState, useEffect } from "react";

/**
 * Listen to CSS media query changes.
 * Returns whether the media query currently matches.
 * 
 * @param query - The CSS media query string (e.g., "(min-width: 768px)")
 * @returns `true` if the media query matches, `false` otherwise
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery("(max-width: 768px)");
 * 
 * return <div>{isMobile ? "Mobile View" : "Desktop View"}</div>;
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const isClient = typeof window !== "undefined";
  const [matches, setMatches] = useState<boolean>(() =>
    isClient ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (!isClient) return;

    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches(e.matches);
    };

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener);
      setMatches(media.matches);
      return () => media.removeEventListener("change", listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener as (this: MediaQueryList, ev: MediaQueryListEvent) => any);
      setMatches(media.matches);
      return () => media.removeListener(listener as (this: MediaQueryList, ev: MediaQueryListEvent) => any);
    }
  }, [query, isClient]);

  return matches;
}
