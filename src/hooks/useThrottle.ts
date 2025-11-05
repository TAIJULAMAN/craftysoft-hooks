import { useRef, useCallback } from "react";

/**
 * Limit how often a function can be called.
 * Ensures the function is called at most once per delay period.
 * 
 * @param callback - The function to throttle
 * @param delay - The delay in milliseconds between allowed calls
 * @returns A throttled version of the callback
 * 
 * @example
 * ```tsx
 * const handleScroll = useThrottle(() => {
 *   console.log("Scroll event");
 * }, 200);
 * 
 * useEffect(() => {
 *   window.addEventListener("scroll", handleScroll);
 *   return () => window.removeEventListener("scroll", handleScroll);
 * }, [handleScroll]);
 * ```
 */
export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastCall = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
}
