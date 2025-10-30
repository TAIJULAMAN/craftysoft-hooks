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
  useCopyToClipboard: () => useCopyToClipboard,
  useDebounce: () => useDebounce,
  useLocalStorage: () => useLocalStorage,
  useMediaQuery: () => useMediaQuery,
  useThrottle: () => useThrottle,
  useWindowSize: () => useWindowSize
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useLocalStorage.ts
var import_react = require("react");
function useLocalStorage(key, initialValue) {
  const [value, setValue] = (0, import_react.useState)(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  (0, import_react.useEffect)(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
    }
  }, [key, value]);
  return [value, setValue];
}

// src/hooks/useDebounce.ts
var import_react2 = require("react");
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = (0, import_react2.useState)(value);
  (0, import_react2.useEffect)(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// src/hooks/useThrottle.ts
var import_react3 = require("react");
function useThrottle(callback, delay) {
  const lastCall = (0, import_react3.useRef)(0);
  return (...args) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  };
}

// src/hooks/useClickOutside.ts
var import_react4 = require("react");
function useClickOutside(ref, callback) {
  (0, import_react4.useEffect)(() => {
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
var import_react5 = require("react");
function useCopyToClipboard() {
  const [copiedText, setCopiedText] = (0, import_react5.useState)(null);
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
var import_react6 = require("react");
function useMediaQuery(query) {
  const isClient = typeof window !== "undefined";
  const [matches, setMatches] = (0, import_react6.useState)(() => isClient ? window.matchMedia(query).matches : false);
  (0, import_react6.useEffect)(() => {
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
var import_react7 = require("react");
function useWindowSize() {
  const isClient = typeof window !== "undefined";
  const [size, setSize] = (0, import_react7.useState)({ width: isClient ? window.innerWidth : 0, height: isClient ? window.innerHeight : 0 });
  (0, import_react7.useEffect)(() => {
    if (!isClient) return;
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);
  return size;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useClickOutside,
  useCopyToClipboard,
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useThrottle,
  useWindowSize
});
