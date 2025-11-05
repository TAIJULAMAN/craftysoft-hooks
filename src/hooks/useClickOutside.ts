import { useEffect, RefObject } from "react";

/**
 * Detect clicks outside of a specified element.
 * Useful for closing modals, dropdowns, or popovers.
 * 
 * @param ref - A ref to the element to detect clicks outside of
 * @param callback - Function to call when a click outside is detected
 * 
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * 
 * useClickOutside(ref, () => {
 *   setIsOpen(false);
 * });
 * 
 * return <div ref={ref}>Content</div>;
 * ```
 */
export function useClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void
): void {
  useEffect(() => {
    const handler = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    if (typeof window === "undefined") return;

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, callback]);
}
