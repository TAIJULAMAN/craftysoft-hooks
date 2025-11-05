"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  useClickOutside: () => useClickOutside,
  useClipboard: () => useClipboard,
  useCopyToClipboard: () => useCopyToClipboard,
  useCounter: () => useCounter,
  useDarkMode: () => useDarkMode,
  useDebounce: () => useDebounce,
  useElementSize: () => useElementSize,
  useEventListener: () => useEventListener,
  useFetch: () => useFetch,
  useIdleTimer: () => useIdleTimer,
  useKeyPress: () => useKeyPress,
  useLocalStorage: () => useLocalStorage,
  useMediaQuery: () => useMediaQuery,
  useNetworkStatus: () => useNetworkStatus,
  usePageVisibility: () => usePageVisibility,
  usePrevious: () => usePrevious,
  useScrollPosition: () => useScrollPosition,
  useSessionStorage: () => useSessionStorage,
  useThrottle: () => useThrottle,
  useToggle: () => useToggle,
  useWindowSize: () => useWindowSize
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useLocalStorage.ts
var import_react = require("react");
function useLocalStorage(key, initialValue) {
  const [value, setValue] = (0, import_react.useState)(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
    }
  }, [key, value]);
  return [value, setValue];
}

// src/hooks/useSessionStorage.ts
var import_react2 = require("react");
function useSessionStorage(key, initialValue) {
  const [value, setValue] = (0, import_react2.useState)(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });
  (0, import_react2.useEffect)(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
    }
  }, [key, value]);
  return [value, setValue];
}

// src/hooks/useToggle.ts
var import_react3 = require("react");
function useToggle(initialValue = false) {
  const [value, setValue] = (0, import_react3.useState)(initialValue);
  const toggle = (0, import_react3.useCallback)(() => {
    setValue((prev) => !prev);
  }, []);
  const setTrue = (0, import_react3.useCallback)(() => {
    setValue(true);
  }, []);
  const setFalse = (0, import_react3.useCallback)(() => {
    setValue(false);
  }, []);
  return [value, toggle, setTrue, setFalse];
}

// src/hooks/usePrevious.ts
var import_react4 = require("react");
function usePrevious(value) {
  const ref = (0, import_react4.useRef)();
  (0, import_react4.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// src/hooks/useCounter.ts
var import_react5 = require("react");
function useCounter(initialValue = 0, step = 1, min, max) {
  const [count, setCount] = (0, import_react5.useState)(initialValue);
  const increment = (0, import_react5.useCallback)(() => {
    setCount((prev) => {
      const next = prev + step;
      return max !== void 0 ? Math.min(next, max) : next;
    });
  }, [step, max]);
  const decrement = (0, import_react5.useCallback)(() => {
    setCount((prev) => {
      const next = prev - step;
      return min !== void 0 ? Math.max(next, min) : next;
    });
  }, [step, min]);
  const reset = (0, import_react5.useCallback)(() => {
    setCount(initialValue);
  }, [initialValue]);
  const setValue = (0, import_react5.useCallback)((value) => {
    let nextValue = value;
    if (min !== void 0) nextValue = Math.max(nextValue, min);
    if (max !== void 0) nextValue = Math.min(nextValue, max);
    setCount(nextValue);
  }, [min, max]);
  return { count, increment, decrement, reset, setValue };
}

// src/hooks/useNetworkStatus.ts
var import_react6 = require("react");
function useNetworkStatus() {
  const isClient = typeof window !== "undefined";
  const [isOnline, setIsOnline] = (0, import_react6.useState)(
    isClient ? navigator.onLine : true
  );
  const [wasOffline, setWasOffline] = (0, import_react6.useState)(false);
  (0, import_react6.useEffect)(() => {
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
var import_react7 = require("react");
function useWindowSize() {
  const isClient = typeof window !== "undefined";
  const [size, setSize] = (0, import_react7.useState)({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0
  });
  (0, import_react7.useEffect)(() => {
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
var import_react8 = require("react");
function useMediaQuery(query) {
  const isClient = typeof window !== "undefined";
  const [matches, setMatches] = (0, import_react8.useState)(
    () => isClient ? window.matchMedia(query).matches : false
  );
  (0, import_react8.useEffect)(() => {
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
var import_react9 = require("react");
function useScrollPosition() {
  const isClient = typeof window !== "undefined";
  const [scrollPosition, setScrollPosition] = (0, import_react9.useState)({
    x: isClient ? window.scrollX : 0,
    y: isClient ? window.scrollY : 0,
    direction: null
  });
  (0, import_react9.useEffect)(() => {
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
var import_react10 = require("react");
function useElementSize(ref) {
  const [size, setSize] = (0, import_react10.useState)({
    width: 0,
    height: 0
  });
  (0, import_react10.useEffect)(() => {
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
var import_react11 = require("react");
function useClipboard() {
  const [copiedText, setCopiedText] = (0, import_react11.useState)(null);
  const copy = (0, import_react11.useCallback)(async (text) => {
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
var import_react12 = require("react");
function useDarkMode(initialValue = "system") {
  const [themePreference, setThemePreference] = useLocalStorage("theme-preference", initialValue);
  const getSystemTheme = (0, import_react12.useCallback)(() => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);
  const getEffectiveTheme = (0, import_react12.useCallback)(() => {
    if (themePreference === "system") {
      return getSystemTheme();
    }
    return themePreference;
  }, [themePreference, getSystemTheme]);
  const [theme, setTheme] = (0, import_react12.useState)(getEffectiveTheme);
  (0, import_react12.useEffect)(() => {
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
  const toggle = (0, import_react12.useCallback)(() => {
    setThemePreference((prev) => {
      if (prev === "system") return "dark";
      return prev === "dark" ? "light" : "dark";
    });
  }, [setThemePreference]);
  const setDark = (0, import_react12.useCallback)(() => {
    setThemePreference("dark");
  }, [setThemePreference]);
  const setLight = (0, import_react12.useCallback)(() => {
    setThemePreference("light");
  }, [setThemePreference]);
  const setSystem = (0, import_react12.useCallback)(() => {
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
var import_react13 = require("react");
function usePageVisibility() {
  const isClient = typeof window !== "undefined";
  const [isVisible, setIsVisible] = (0, import_react13.useState)(
    isClient ? !document.hidden : true
  );
  (0, import_react13.useEffect)(() => {
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
var import_react14 = require("react");
function useIdleTimer(timeout = 3e4, events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]) {
  const isClient = typeof window !== "undefined";
  const [isIdle, setIsIdle] = (0, import_react14.useState)(false);
  const timerRef = (0, import_react14.useRef)(null);
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
  (0, import_react14.useEffect)(() => {
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
var import_react15 = require("react");
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = (0, import_react15.useState)(value);
  (0, import_react15.useEffect)(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// src/hooks/useThrottle.ts
var import_react16 = require("react");
function useThrottle(callback, delay) {
  const lastCall = (0, import_react16.useRef)(0);
  return (0, import_react16.useCallback)(
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
var import_react17 = require("react");
function useFetch(url, options) {
  const [data, setData] = (0, import_react17.useState)(null);
  const [loading, setLoading] = (0, import_react17.useState)(false);
  const [error, setError] = (0, import_react17.useState)(null);
  const fetchData = (0, import_react17.useCallback)(async () => {
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
  (0, import_react17.useEffect)(() => {
    fetchData();
  }, [fetchData]);
  return { data, loading, error, refetch: fetchData };
}

// src/hooks/useClickOutside.ts
var import_react18 = require("react");
function useClickOutside(ref, callback) {
  (0, import_react18.useEffect)(() => {
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
var import_react19 = require("react");
function useKeyPress(targetKey) {
  const isClient = typeof window !== "undefined";
  const [keyPressed, setKeyPressed] = (0, import_react19.useState)(false);
  const keys = Array.isArray(targetKey) ? targetKey : [targetKey];
  (0, import_react19.useEffect)(() => {
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
var import_react20 = require("react");
function useEventListener(eventName, handler, element, options) {
  (0, import_react20.useEffect)(() => {
    if (typeof window === "undefined") return;
    const targetElement = element?.current ?? window;
    if (!targetElement) return;
    targetElement.addEventListener(eventName, handler, options);
    return () => {
      targetElement.removeEventListener(eventName, handler, options);
    };
  }, [eventName, handler, element, options]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
