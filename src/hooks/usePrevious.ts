import { useRef, useEffect } from "react";

/**
 * Track the previous value of a state or prop.
 * Useful for comparing current and previous values.
 * 
 * @param value - The current value to track
 * @returns The previous value
 * 
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * 
 * return (
 *   <div>
 *     <p>Current: {count}</p>
 *     <p>Previous: {prevCount}</p>
 *     <button onClick={() => setCount(count + 1)}>Increment</button>
 *   </div>
 * );
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

