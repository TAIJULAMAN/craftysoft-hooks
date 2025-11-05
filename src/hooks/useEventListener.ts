import { useEffect, RefObject } from "react";

/**
 * Add and clean up event listeners safely.
 * A generic hook for attaching event listeners to DOM elements or the window.
 * 
 * @param eventName - The event name to listen for
 * @param handler - The event handler function
 * @param element - The element to attach the listener to (default: window)
 * @param options - Event listener options (e.g., { passive: true })
 * 
 * @example
 * ```tsx
 * useEventListener("scroll", () => {
 *   console.log("Window scrolled");
 * });
 * 
 * const ref = useRef<HTMLDivElement>(null);
 * useEventListener("click", handleClick, ref);
 * ```
 */
export function useEventListener<T extends HTMLElement = HTMLElement>(
  eventName: string,
  handler: (event: Event) => void,
  element?: RefObject<T> | null,
  options?: boolean | AddEventListenerOptions
): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const targetElement: T | Window =
      element?.current ?? window;

    if (!targetElement) return;

    targetElement.addEventListener(eventName, handler, options);

    return () => {
      targetElement.removeEventListener(eventName, handler, options);
    };
  }, [eventName, handler, element, options]);
}

