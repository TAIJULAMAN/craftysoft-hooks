// src/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
    }
  }, [key, value]);
  return [value, setValue];
}

// src/hooks/useDebounce.ts
import { useEffect as useEffect2, useState as useState2 } from "react";
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState2(value);
  useEffect2(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// src/hooks/useThrottle.ts
import { useRef } from "react";
function useThrottle(callback, delay) {
  const lastCall = useRef(0);
  return (...args) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  };
}

// src/hooks/useClickOutside.ts
import { useEffect as useEffect3 } from "react";
function useClickOutside(ref, callback) {
  useEffect3(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) callback();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, callback]);
}

// src/hooks/useCopyToClipboard.ts
import { useState as useState3 } from "react";
function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState3(null);
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch {
      return false;
    }
  };
  return { copiedText, copy };
}

// src/hooks/useMediaQuery.ts
import { useState as useState4, useEffect as useEffect4 } from "react";
function useMediaQuery(query) {
  const isClient = typeof window !== "undefined";
  const [matches, setMatches] = useState4(() => isClient ? window.matchMedia(query).matches : false);
  useEffect4(() => {
    if (!isClient) return;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    setMatches(media.matches);
    return () => media.removeEventListener("change", listener);
  }, [query, isClient]);
  return matches;
}

// src/hooks/useWindowSize.ts
import { useState as useState5, useEffect as useEffect5 } from "react";
function useWindowSize() {
  const isClient = typeof window !== "undefined";
  const [size, setSize] = useState5({ width: isClient ? window.innerWidth : 0, height: isClient ? window.innerHeight : 0 });
  useEffect5(() => {
    if (!isClient) return;
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);
  return size;
}
export {
  useClickOutside,
  useCopyToClipboard,
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useThrottle,
  useWindowSize
};
