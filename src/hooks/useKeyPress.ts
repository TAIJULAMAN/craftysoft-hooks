import { useState, useEffect } from "react";

/**
 * Detect key presses.
 * Tracks whether a specific key (or keys) is currently pressed.
 * 
 * @param targetKey - The key or keys to detect (e.g., "Enter", "Escape", ["Control", "c"])
 * @returns `true` if any of the target keys are pressed
 * 
 * @example
 * ```tsx
 * const isEnterPressed = useKeyPress("Enter");
 * const isCtrlCPressed = useKeyPress(["Control", "c"]);
 * 
 * useEffect(() => {
 *   if (isEnterPressed) {
 *     console.log("Enter key is pressed");
 *   }
 * }, [isEnterPressed]);
 * ```
 */
export function useKeyPress(
  targetKey: string | string[]
): boolean {
  const isClient = typeof window !== "undefined";
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  const keys = Array.isArray(targetKey) ? targetKey : [targetKey];

  useEffect(() => {
    if (!isClient) return;

    const downHandler = (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
        setKeyPressed(true);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keys, isClient]);

  return keyPressed;
}

