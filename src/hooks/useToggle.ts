import { useState, useCallback } from "react";

/**
 * Manage boolean state easily with toggle functionality.
 * Provides a simple way to handle on/off states.
 * 
 * @param initialValue - The initial boolean value (default: false)
 * @returns A tuple with the current value, a toggle function, and setter functions
 * 
 * @example
 * ```tsx
 * const [isOpen, toggle, setTrue, setFalse] = useToggle(false);
 * 
 * return (
 *   <div>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={setTrue}>Open</button>
 *     <button onClick={setFalse}>Close</button>
 *     {isOpen && <div>Content</div>}
 *   </div>
 * );
 * ```
 */
export function useToggle(
  initialValue = false
): [
  boolean,
  () => void,
  () => void,
  () => void
] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return [value, toggle, setTrue, setFalse];
}

