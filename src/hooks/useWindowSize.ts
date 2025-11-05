import { useState, useEffect } from "react";

/**
 * Track window width and height.
 * Returns the current window dimensions and updates on resize.
 * 
 * @returns An object with `width` and `height` properties
 * 
 * @example
 * ```tsx
 * const { width, height } = useWindowSize();
 * 
 * return (
 *   <div>
 *     Window size: {width} x {height}
 *   </div>
 * );
 * ```
 */
export function useWindowSize(): { width: number; height: number } {
  const isClient = typeof window !== "undefined";
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return size;
}
