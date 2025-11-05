import { useState, useEffect } from "react";

/**
 * Get scroll position and direction.
 * Tracks scroll position (x, y) and scroll direction.
 * 
 * @returns An object with scroll position and direction
 * 
 * @example
 * ```tsx
 * const { x, y, direction } = useScrollPosition();
 * 
 * return (
 *   <div>
 *     <p>Scroll X: {x}, Y: {y}</p>
 *     <p>Direction: {direction}</p>
 *   </div>
 * );
 * ```
 */
export function useScrollPosition(): {
  x: number;
  y: number;
  direction: "up" | "down" | null;
} {
  const isClient = typeof window !== "undefined";
  const [scrollPosition, setScrollPosition] = useState<{
    x: number;
    y: number;
    direction: "up" | "down" | null;
  }>({
    x: isClient ? window.scrollX : 0,
    y: isClient ? window.scrollY : 0,
    direction: null,
  });

  useEffect(() => {
    if (!isClient) return;

    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const direction: "up" | "down" | null =
        currentY > lastY ? "down" : currentY < lastY ? "up" : null;

      setScrollPosition({
        x: window.scrollX,
        y: currentY,
        direction,
      });

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);

  return scrollPosition;
}

