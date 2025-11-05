import { useState, useEffect } from "react";

/**
 * Detect online/offline network state.
 * Monitors the browser's online/offline status.
 * 
 * @returns An object with `isOnline` boolean and `wasOffline` flag
 * 
 * @example
 * ```tsx
 * const { isOnline, wasOffline } = useNetworkStatus();
 * 
 * return (
 *   <div>
 *     {!isOnline && <p>You are offline</p>}
 *     {wasOffline && <p>You were offline but are now back online</p>}
 *   </div>
 * );
 * ```
 */
export function useNetworkStatus(): {
  isOnline: boolean;
  wasOffline: boolean;
} {
  const isClient = typeof window !== "undefined";
  const [isOnline, setIsOnline] = useState<boolean>(
    isClient ? navigator.onLine : true
  );
  const [wasOffline, setWasOffline] = useState<boolean>(false);

  useEffect(() => {
    if (!isClient) return;

    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        setWasOffline(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isClient, wasOffline]);

  return { isOnline, wasOffline };
}

