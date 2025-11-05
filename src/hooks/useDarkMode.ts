import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Toggle and persist dark/light mode.
 * Manages theme preference with localStorage persistence and system preference detection.
 * 
 * @param initialValue - Initial theme value (default: "system" to detect from OS)
 * @returns An object with theme state and toggle function
 * 
 * @example
 * ```tsx
 * const { theme, toggle, setDark, setLight } = useDarkMode("system");
 * 
 * useEffect(() => {
 *   document.documentElement.classList.toggle("dark", theme === "dark");
 * }, [theme]);
 * 
 * return (
 *   <button onClick={toggle}>
 *     Current theme: {theme}
 *   </button>
 * );
 * ```
 */
export function useDarkMode(
  initialValue: "light" | "dark" | "system" = "system"
): {
  theme: "light" | "dark";
  themePreference: "light" | "dark" | "system";
  toggle: () => void;
  setDark: () => void;
  setLight: () => void;
  setSystem: () => void;
} {
  const [themePreference, setThemePreference] = useLocalStorage<
    "light" | "dark" | "system"
  >("theme-preference", initialValue);

  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  const getEffectiveTheme = useCallback((): "light" | "dark" => {
    if (themePreference === "system") {
      return getSystemTheme();
    }
    return themePreference;
  }, [themePreference, getSystemTheme]);

  const [theme, setTheme] = useState<"light" | "dark">(getEffectiveTheme);

  // Update theme when preference or system theme changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const effectiveTheme = getEffectiveTheme();
    setTheme(effectiveTheme);

    if (themePreference === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        setTheme(getSystemTheme());
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [themePreference, getEffectiveTheme, getSystemTheme]);

  const toggle = useCallback(() => {
    setThemePreference((prev) => {
      if (prev === "system") return "dark";
      return prev === "dark" ? "light" : "dark";
    });
  }, [setThemePreference]);

  const setDark = useCallback(() => {
    setThemePreference("dark");
  }, [setThemePreference]);

  const setLight = useCallback(() => {
    setThemePreference("light");
  }, [setThemePreference]);

  const setSystem = useCallback(() => {
    setThemePreference("system");
  }, [setThemePreference]);

  return {
    theme,
    themePreference,
    toggle,
    setDark,
    setLight,
    setSystem,
  };
}

