import { useState, useEffect, Dispatch, SetStateAction } from "react";

/**
 * Manage sessionStorage data with React state synchronization.
 * Similar to useLocalStorage but uses sessionStorage instead.
 * 
 * @param key - The sessionStorage key to store the value under
 * @param initialValue - The initial value to use if no stored value exists
 * @returns A tuple containing the current value and a setter function
 * 
 * @example
 * ```tsx
 * const [session, setSession] = useSessionStorage("sessionId", "");
 * 
 * return (
 *   <div>
 *     <p>Session: {session}</p>
 *     <button onClick={() => setSession("abc123")}>Set Session</button>
 *   </div>
 * );
 * ```
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore write errors (e.g., storage full, sandboxed iframe)
    }
  }, [key, value]);

  return [value, setValue];
}

