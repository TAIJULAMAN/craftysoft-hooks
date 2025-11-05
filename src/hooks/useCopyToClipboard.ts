import { useState, useCallback } from "react";

/**
 * Copy text to clipboard with async support.
 * Returns the copied text and a function to copy new text.
 * 
 * @returns An object with `copiedText` and `copy` function
 * 
 * @example
 * ```tsx
 * const { copiedText, copy } = useClipboard();
 * 
 * return (
 *   <button onClick={() => copy("Hello, World!")}>
 *     {copiedText ? `Copied: ${copiedText}` : "Copy"}
 *   </button>
 * );
 * ```
 */
export function useClipboard(): {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
} {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (typeof window === "undefined" || !navigator.clipboard) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopiedText(text);
        return true;
      } catch {
        return false;
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { copiedText, copy };
}

/**
 * @deprecated Use `useClipboard` instead. This will be removed in a future version.
 */
export const useCopyToClipboard = useClipboard;
