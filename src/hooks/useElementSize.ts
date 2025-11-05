import { useState, useEffect, RefObject } from "react";

/**
 * Observe element dimensions via ResizeObserver.
 * Tracks the width and height of a DOM element.
 * 
 * @param ref - A ref to the element to observe
 * @returns An object with `width` and `height` properties
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const { width, height } = useElementSize(ref);
 * 
 * return (
 *   <div ref={ref}>
 *     <p>Width: {width}px, Height: {height}px</p>
 *   </div>
 * );
 * ```
 */
export function useElementSize<T extends HTMLElement>(
  ref: RefObject<T>
): { width: number; height: number } {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const element = ref.current;

    // Use ResizeObserver if available
    if (window.ResizeObserver) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setSize({ width, height });
        }
      });

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback for older browsers
      const updateSize = () => {
        setSize({
          width: element.offsetWidth,
          height: element.offsetHeight,
        });
      };

      updateSize();
      window.addEventListener("resize", updateSize);

      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }
  }, [ref]);

  return size;
}

