// src/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
    }
  }, [key, value]);
  return [value, setValue];
}

// src/hooks/useSessionStorage.ts
import { useState as useState2, useEffect as useEffect2 } from "react";
function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState2(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect2(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
    }
  }, [key, value]);
  return [value, setValue];
}

// src/hooks/useToggle.ts
import { useState as useState3, useCallback } from "react";
function useToggle(initialValue = false) {
  const [value, setValue] = useState3(initialValue);
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

// src/hooks/usePrevious.ts
import { useRef, useEffect as useEffect3 } from "react";
function usePrevious(value) {
  const ref = useRef();
  useEffect3(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// src/hooks/useCounter.ts
import { useState as useState4, useCallback as useCallback2 } from "react";
function useCounter(initialValue = 0, step = 1, min, max) {
  const [count, setCount] = useState4(initialValue);
  const increment = useCallback2(() => {
    setCount((prev) => {
      const next = prev + step;
      return max !== void 0 ? Math.min(next, max) : next;
    });
  }, [step, max]);
  const decrement = useCallback2(() => {
    setCount((prev) => {
      const next = prev - step;
      return min !== void 0 ? Math.max(next, min) : next;
    });
  }, [step, min]);
  const reset = useCallback2(() => {
    setCount(initialValue);
  }, [initialValue]);
  const setValue = useCallback2((value) => {
    let nextValue = value;
    if (min !== void 0) nextValue = Math.max(nextValue, min);
    if (max !== void 0) nextValue = Math.min(nextValue, max);
    setCount(nextValue);
  }, [min, max]);
  return { count, increment, decrement, reset, setValue };
}

// src/hooks/useNetworkStatus.ts
import { useState as useState5, useEffect as useEffect4 } from "react";
function useNetworkStatus() {
  const isClient = typeof window !== "undefined";
  const [isOnline, setIsOnline] = useState5(
    isClient ? navigator.onLine : true
  );
  const [wasOffline, setWasOffline] = useState5(false);
  useEffect4(() => {
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

// src/hooks/useWindowSize.ts
import { useState as useState6, useEffect as useEffect5 } from "react";
function useWindowSize() {
  const isClient = typeof window !== "undefined";
  const [size, setSize] = useState6({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0
  });
  useEffect5(() => {
    if (!isClient) return;
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);
  return size;
}

// src/hooks/useMediaQuery.ts
import { useState as useState7, useEffect as useEffect6 } from "react";
function useMediaQuery(query) {
  const isClient = typeof window !== "undefined";
  const [matches, setMatches] = useState7(
    () => isClient ? window.matchMedia(query).matches : false
  );
  useEffect6(() => {
    if (!isClient) return;
    const media = window.matchMedia(query);
    const listener = (e) => {
      setMatches(e.matches);
    };
    if (media.addEventListener) {
      media.addEventListener("change", listener);
      setMatches(media.matches);
      return () => media.removeEventListener("change", listener);
    } else {
      media.addListener(listener);
      setMatches(media.matches);
      return () => media.removeListener(listener);
    }
  }, [query, isClient]);
  return matches;
}

// src/hooks/useScrollPosition.ts
import { useState as useState8, useEffect as useEffect7 } from "react";
function useScrollPosition() {
  const isClient = typeof window !== "undefined";
  const [scrollPosition, setScrollPosition] = useState8({
    x: isClient ? window.scrollX : 0,
    y: isClient ? window.scrollY : 0,
    direction: null
  });
  useEffect7(() => {
    if (!isClient) return;
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY > lastY ? "down" : currentY < lastY ? "up" : null;
      setScrollPosition({
        x: window.scrollX,
        y: currentY,
        direction
      });
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);
  return scrollPosition;
}

// src/hooks/useElementSize.ts
import { useState as useState9, useEffect as useEffect8 } from "react";
function useElementSize(ref) {
  const [size, setSize] = useState9({
    width: 0,
    height: 0
  });
  useEffect8(() => {
    if (!ref.current || typeof window === "undefined") return;
    const element = ref.current;
    if (window.ResizeObserver) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setSize({ width, height });
        }
      });
      observer.observe(element);
      return () => {
        observer.disconnect();
      };
    } else {
      const updateSize = () => {
        setSize({
          width: element.offsetWidth,
          height: element.offsetHeight
        });
      };
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }
  }, [ref]);
  return size;
}

// src/hooks/useCopyToClipboard.ts
import { useState as useState10, useCallback as useCallback3 } from "react";
function useClipboard() {
  const [copiedText, setCopiedText] = useState10(null);
  const copy = useCallback3(async (text) => {
    if (typeof window === "undefined" || !navigator.clipboard) {
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
var useCopyToClipboard = useClipboard;

// src/hooks/useDarkMode.ts
import { useState as useState11, useEffect as useEffect9, useCallback as useCallback4 } from "react";
function useDarkMode(initialValue = "system") {
  const [themePreference, setThemePreference] = useLocalStorage("theme-preference", initialValue);
  const getSystemTheme = useCallback4(() => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);
  const getEffectiveTheme = useCallback4(() => {
    if (themePreference === "system") {
      return getSystemTheme();
    }
    return themePreference;
  }, [themePreference, getSystemTheme]);
  const [theme, setTheme] = useState11(getEffectiveTheme);
  useEffect9(() => {
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
  const toggle = useCallback4(() => {
    setThemePreference((prev) => {
      if (prev === "system") return "dark";
      return prev === "dark" ? "light" : "dark";
    });
  }, [setThemePreference]);
  const setDark = useCallback4(() => {
    setThemePreference("dark");
  }, [setThemePreference]);
  const setLight = useCallback4(() => {
    setThemePreference("light");
  }, [setThemePreference]);
  const setSystem = useCallback4(() => {
    setThemePreference("system");
  }, [setThemePreference]);
  return {
    theme,
    themePreference,
    toggle,
    setDark,
    setLight,
    setSystem
  };
}

// src/hooks/usePageVisibility.ts
import { useState as useState12, useEffect as useEffect10 } from "react";
function usePageVisibility() {
  const isClient = typeof window !== "undefined";
  const [isVisible, setIsVisible] = useState12(
    isClient ? !document.hidden : true
  );
  useEffect10(() => {
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

// src/hooks/useIdleTimer.ts
import { useState as useState13, useEffect as useEffect11, useRef as useRef2 } from "react";
function useIdleTimer(timeout = 3e4, events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]) {
  const isClient = typeof window !== "undefined";
  const [isIdle, setIsIdle] = useState13(false);
  const timerRef = useRef2(null);
  const reset = () => {
    if (!isClient) return;
    setIsIdle(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, timeout);
  };
  useEffect11(() => {
    if (!isClient) return;
    reset();
    const handleEvent = () => {
      reset();
    };
    events.forEach((event) => {
      window.addEventListener(event, handleEvent, { passive: true });
    });
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleEvent);
      });
    };
  }, [timeout, isClient]);
  return { isIdle, reset };
}

// src/hooks/useDebounce.ts
import { useEffect as useEffect12, useState as useState14 } from "react";
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState14(value);
  useEffect12(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// src/hooks/useThrottle.ts
import { useRef as useRef3, useCallback as useCallback5 } from "react";
function useThrottle(callback, delay) {
  const lastCall = useRef3(0);
  return useCallback5(
    (...args) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
}

// src/hooks/useFetch.ts
import { useState as useState15, useEffect as useEffect13, useCallback as useCallback6 } from "react";
function useFetch(url, options) {
  const [data, setData] = useState15(null);
  const [loading, setLoading] = useState15(false);
  const [error, setError] = useState15(null);
  const fetchData = useCallback6(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, options]);
  useEffect13(() => {
    fetchData();
  }, [fetchData]);
  return { data, loading, error, refetch: fetchData };
}

// src/hooks/useClickOutside.ts
import { useEffect as useEffect14 } from "react";
function useClickOutside(ref, callback) {
  useEffect14(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    if (typeof window === "undefined") return;
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, callback]);
}

// src/hooks/useKeyPress.ts
import { useState as useState16, useEffect as useEffect15 } from "react";
function useKeyPress(targetKey) {
  const isClient = typeof window !== "undefined";
  const [keyPressed, setKeyPressed] = useState16(false);
  const keys = Array.isArray(targetKey) ? targetKey : [targetKey];
  useEffect15(() => {
    if (!isClient) return;
    const downHandler = (event) => {
      if (keys.includes(event.key)) {
        setKeyPressed(true);
      }
    };
    const upHandler = (event) => {
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

// src/hooks/useEventListener.ts
import { useEffect as useEffect16 } from "react";
function useEventListener(eventName, handler, element, options) {
  useEffect16(() => {
    if (typeof window === "undefined") return;
    const targetElement = element?.current ?? window;
    if (!targetElement) return;
    targetElement.addEventListener(eventName, handler, options);
    return () => {
      targetElement.removeEventListener(eventName, handler, options);
    };
  }, [eventName, handler, element, options]);
}
export {
  useClickOutside,
  useClipboard,
  useCopyToClipboard,
  useCounter,
  useDarkMode,
  useDebounce,
  useElementSize,
  useEventListener,
  useFetch,
  useIdleTimer,
  useKeyPress,
  useLocalStorage,
  useMediaQuery,
  useNetworkStatus,
  usePageVisibility,
  usePrevious,
  useScrollPosition,
  useSessionStorage,
  useThrottle,
  useToggle,
  useWindowSize
};
