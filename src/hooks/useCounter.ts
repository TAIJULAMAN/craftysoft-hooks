import { useState, useCallback } from "react";

/**
 * Simple counter with increment, decrement, reset, and set functions.
 * Provides a convenient way to manage numeric state.
 * 
 * @param initialValue - The initial counter value (default: 0)
 * @param step - The step size for increment/decrement (default: 1)
 * @param min - The minimum allowed value (optional)
 * @param max - The maximum allowed value (optional)
 * @returns An object with count value and control functions
 * 
 * @example
 * ```tsx
 * const { count, increment, decrement, reset, setValue } = useCounter(0, 1, 0, 10);
 * 
 * return (
 *   <div>
 *     <p>Count: {count}</p>
 *     <button onClick={increment}>+</button>
 *     <button onClick={decrement}>-</button>
 *     <button onClick={reset}>Reset</button>
 *     <button onClick={() => setValue(5)}>Set to 5</button>
 *   </div>
 * );
 * ```
 */
export function useCounter(
  initialValue = 0,
  step = 1,
  min?: number,
  max?: number
): {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
} {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + step;
      return max !== undefined ? Math.min(next, max) : next;
    });
  }, [step, max]);

  const decrement = useCallback(() => {
    setCount((prev) => {
      const next = prev - step;
      return min !== undefined ? Math.max(next, min) : next;
    });
  }, [step, min]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const setValue = useCallback((value: number) => {
    let nextValue = value;
    if (min !== undefined) nextValue = Math.max(nextValue, min);
    if (max !== undefined) nextValue = Math.min(nextValue, max);
    setCount(nextValue);
  }, [min, max]);

  return { count, increment, decrement, reset, setValue };
}

