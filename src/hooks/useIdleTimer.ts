import { useState, useEffect, useRef } from "react";

/**
 * Detect user inactivity.
 * Tracks when the user has been idle (no mouse, keyboard, or touch activity) for a specified time.
 * 
 * @param timeout - The idle timeout in milliseconds (default: 30000)
 * @param events - Array of events to listen for (default: ["mousedown", "mousemove", "keypress", "scroll", "touchstart"])
 * @returns An object with `isIdle` boolean and `reset` function
 * 
 * @example
 * ```tsx
 * const { isIdle, reset } = useIdleTimer(5000);
 * 
 * return (
 *   <div>
 *     {isIdle && <p>You've been idle for 5 seconds</p>}
 *     <button onClick={reset}>Reset Timer</button>
 *   </div>
 * );
 * ```
 */
export function useIdleTimer(
  timeout = 30000,
  events: string[] = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]
): {
  isIdle: boolean;
  reset: () => void;
} {
  const isClient = typeof window !== "undefined";
  const [isIdle, setIsIdle] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = () => {
    if (!isClient) return;
    setIsIdle(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, timeout);
  };

  useEffect(() => {
    if (!isClient) return;

    reset();

    const handleEvent = () => {
      reset();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleEvent, { passive: true });
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleEvent);
      });
    };
  }, [timeout, isClient]);

  return { isIdle, reset };
}

