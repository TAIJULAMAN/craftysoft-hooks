# Craftysoft Hooks

A professional, developer-friendly, and production-ready **React custom hooks library** with 20+ high-utility hooks that improve developer productivity.

[![npm version](https://img.shields.io/npm/v/@craftysoft/hooks.svg)](https://www.npmjs.com/package/@craftysoft/hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **20+ Production-Ready Hooks** - Carefully crafted hooks for common use cases
- 📦 **Tree-Shakeable** - ESM support with zero dependencies (except React)
- 🔒 **Type-Safe** - Full TypeScript support with JSDoc documentation
- ⚡ **Performance Optimized** - Memoized callbacks and optimized re-renders
- 🌐 **SSR-Safe** - Works seamlessly with Next.js and other SSR frameworks
- 🧪 **Well Tested** - Comprehensive test coverage with Vitest

##  Installation

```bash
npm install craftysoft-hooks
# or
yarn add craftysoft-hooks
# or
pnpm add craftysoft-hooks
```

## 🚀 Quick Start

```tsx
import { useLocalStorage, useDebounce, useToggle } from "craftysoft-hooks";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [isOpen, toggle] = useToggle(false);
  const debouncedSearch = useDebounce(theme, 300);

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
}
```

##  Hooks Documentation

###  State Management Hooks

#### `useLocalStorage`

Store and sync data with localStorage.

```tsx
const [value, setValue] = useLocalStorage("key", initialValue);
```

**Example:**
```tsx
const [theme, setTheme] = useLocalStorage("theme", "light");

return (
  <button onClick={() => setTheme("dark")}>
    Current: {theme}
  </button>
);
```

---

#### `useSessionStorage`

Manage sessionStorage data (similar to useLocalStorage but uses sessionStorage).

```tsx
const [value, setValue] = useSessionStorage("key", initialValue);
```

**Example:**
```tsx
const [session, setSession] = useSessionStorage("sessionId", "");

return (
  <div>
    <p>Session: {session}</p>
    <button onClick={() => setSession("abc123")}>Set Session</button>
  </div>
);
```

---

#### `useToggle`

Manage boolean state easily with toggle functionality.

```tsx
const [value, toggle, setTrue, setFalse] = useToggle(initialValue);
```

**Example:**
```tsx
const [isOpen, toggle, setTrue, setFalse] = useToggle(false);

return (
  <div>
    <button onClick={toggle}>Toggle</button>
    <button onClick={setTrue}>Open</button>
    <button onClick={setFalse}>Close</button>
    {isOpen && <div>Content</div>}
  </div>
);
```

---

#### `usePrevious`

Track the previous value of a state or prop.

```tsx
const previousValue = usePrevious(value);
```

**Example:**
```tsx
const [count, setCount] = useState(0);
const prevCount = usePrevious(count);

return (
  <div>
    <p>Current: {count}</p>
    <p>Previous: {prevCount}</p>
    <button onClick={() => setCount(count + 1)}>Increment</button>
  </div>
);
```

---

#### `useCounter`

Simple counter with increment, decrement, reset, and set functions.

```tsx
const { count, increment, decrement, reset, setValue } = useCounter(
  initialValue,
  step,
  min,
  max
);
```

**Example:**
```tsx
const { count, increment, decrement, reset, setValue } = useCounter(0, 1, 0, 10);

return (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
    <button onClick={reset}>Reset</button>
    <button onClick={() => setValue(5)}>Set to 5</button>
  </div>
);
```

---

###  Browser Hooks

#### `useNetworkStatus`

Detect online/offline network state.

```tsx
const { isOnline, wasOffline } = useNetworkStatus();
```

**Example:**
```tsx
const { isOnline, wasOffline } = useNetworkStatus();

return (
  <div>
    {!isOnline && <p>You are offline</p>}
    {wasOffline && <p>You were offline but are now back online</p>}
  </div>
);
```

---

#### `useWindowSize`

Track window width and height.

```tsx
const { width, height } = useWindowSize();
```

**Example:**
```tsx
const { width, height } = useWindowSize();

return (
  <div>
    Window size: {width} x {height}
  </div>
);
```

---

#### `useMediaQuery`

Listen to CSS media query changes.

```tsx
const matches = useMediaQuery("(min-width: 768px)");
```

**Example:**
```tsx
const isMobile = useMediaQuery("(max-width: 768px)");

return <div>{isMobile ? "Mobile View" : "Desktop View"}</div>;
```

---

#### `useScrollPosition`

Get scroll position and direction.

```tsx
const { x, y, direction } = useScrollPosition();
```

**Example:**
```tsx
const { x, y, direction } = useScrollPosition();

return (
  <div>
    <p>Scroll X: {x}, Y: {y}</p>
    <p>Direction: {direction}</p>
  </div>
);
```

---

#### `useElementSize`

Observe element dimensions via ResizeObserver.

```tsx
const ref = useRef<HTMLDivElement>(null);
const { width, height } = useElementSize(ref);
```

**Example:**
```tsx
const ref = useRef<HTMLDivElement>(null);
const { width, height } = useElementSize(ref);

return (
  <div ref={ref}>
    <p>Width: {width}px, Height: {height}px</p>
  </div>
);
```

---

###  Utility Hooks

#### `useClipboard`

Copy text to clipboard with async support.

```tsx
const { copiedText, copy } = useClipboard();
```

**Example:**
```tsx
const { copiedText, copy } = useClipboard();

return (
  <button onClick={() => copy("Hello, World!")}>
    {copiedText ? `Copied: ${copiedText}` : "Copy"}
  </button>
);
```

> **Note:** `useCopyToClipboard` is also exported for backward compatibility but is deprecated.

---

#### `useDarkMode`

Toggle and persist dark/light mode with system preference detection.

```tsx
const { theme, themePreference, toggle, setDark, setLight, setSystem } = useDarkMode(initialValue);
```

**Example:**
```tsx
const { theme, toggle, setDark, setLight } = useDarkMode("system");

useEffect(() => {
  document.documentElement.classList.toggle("dark", theme === "dark");
}, [theme]);

return (
  <button onClick={toggle}>
    Current theme: {theme}
  </button>
);
```

---

#### `usePageVisibility`

Detect if page is visible or hidden.

```tsx
const isVisible = usePageVisibility();
```

**Example:**
```tsx
const isVisible = usePageVisibility();

useEffect(() => {
  if (!isVisible) {
    // Pause video, animations, etc.
  }
}, [isVisible]);
```

---

#### `useIdleTimer`

Detect user inactivity.

```tsx
const { isIdle, reset } = useIdleTimer(timeout, events);
```

**Example:**
```tsx
const { isIdle, reset } = useIdleTimer(5000);

return (
  <div>
    {isIdle && <p>You've been idle for 5 seconds</p>}
    <button onClick={reset}>Reset Timer</button>
  </div>
);
```

---

###  Performance Hooks

#### `useDebounce`

Delay value updates until after a specified delay period.

```tsx
const debouncedValue = useDebounce(value, delay);
```

**Example:**
```tsx
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 300);

useEffect(() => {
  if (debouncedSearch) {
    // Perform search API call
  }
}, [debouncedSearch]);
```

---

#### `useThrottle`

Limit how often a function can be called.

```tsx
const throttledCallback = useThrottle(callback, delay);
```

**Example:**
```tsx
const handleScroll = useThrottle(() => {
  console.log("Scroll event");
}, 200);

useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [handleScroll]);
```

---

###  API Hooks

#### `useFetch`

Fetch data with loading, error, and data states.

```tsx
const { data, loading, error, refetch } = useFetch<T>(url, options);
```

**Example:**
```tsx
const { data, loading, error, refetch } = useFetch<User>("https://api.example.com/user");

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;

return <div>{data?.name}</div>;
```

---

###  Interaction Hooks

#### `useClickOutside`

Detect clicks outside of a specified element.

```tsx
const ref = useRef<HTMLDivElement>(null);
useClickOutside(ref, callback);
```

**Example:**
```tsx
const ref = useRef<HTMLDivElement>(null);

useClickOutside(ref, () => {
  setIsOpen(false);
});

return <div ref={ref}>Content</div>;
```

---

#### `useKeyPress`

Detect key presses.

```tsx
const isPressed = useKeyPress("Enter");
// or for multiple keys
const isPressed = useKeyPress(["Control", "c"]);
```

**Example:**
```tsx
const isEnterPressed = useKeyPress("Enter");
const isCtrlCPressed = useKeyPress(["Control", "c"]);

useEffect(() => {
  if (isEnterPressed) {
    console.log("Enter key is pressed");
  }
}, [isEnterPressed]);
```

---

#### `useEventListener`

Add and clean up event listeners safely.

```tsx
useEventListener(eventName, handler, element, options);
```

**Example:**
```tsx
useEventListener("scroll", () => {
  console.log("Window scrolled");
});

const ref = useRef<HTMLDivElement>(null);
useEventListener("click", handleClick, ref);
```

---

##  Testing

Run tests with Vitest:

```bash
npm test
npm run test:watch
npm run test:coverage
```

## 📖 TypeScript Support

All hooks are fully typed with TypeScript. Types are automatically included when you install the package.

```tsx
import { useLocalStorage } from "@craftysoft/hooks";

// Fully typed with TypeScript
const [value, setValue] = useLocalStorage<string>("key", "initial");
```

##  SSR Support

All hooks are SSR-safe and work seamlessly with Next.js and other server-side rendering frameworks. Hooks that access browser APIs (like `window`, `localStorage`) automatically handle server-side rendering.

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

##  License

MIT © Md Shah Aman Patwary

##  Links

- [GitHub Repository](https://github.com/TAIJULAMAN/craftysoft-hooks)
- [npm Package](https://www.npmjs.com/package/@craftysoft/hooks)

---

Made with ❤️ by the Md Shah Aman Patwary
