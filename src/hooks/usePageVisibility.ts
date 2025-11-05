import { useState, useEffect } from "react";

/**
 * Detect if page is visible or hidden.
 * Uses the Page Visibility API to track when the tab/window is visible.
 * 
 * @returns `true` if the page is visible, `false` if hidden
 * 
 * @example
 * ```tsx
 * const isVisible = usePageVisibility();
 * 
 * useEffect(() => {
 *   if (!isVisible) {
 *     // Pause video, animations, etc.
 *   }
 * }, [isVisible]);
 * ```
 */
export function usePageVisibility(): boolean {
  const isClient = typeof window !== "undefined";
  const [isVisible, setIsVisible] = useState<boolean>(
    isClient ? !document.hidden : true
  );

  useEffect(() => {
    if (!isClient) return;

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isClient]);

  return isVisible;
}

