import { Dispatch, SetStateAction, RefObject } from 'react';

/**
 * Store and sync data with localStorage.
 *
 * @param key - The localStorage key to store the value under
 * @param initialValue - The initial value to use if no stored value exists
 * @returns A tuple containing the current value and a setter function
 *
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage("theme", "light");
 *
 * return (
 *   <button onClick={() => setTheme("dark")}>
 *     Current: {theme}
 *   </button>
 * );
 * ```
 */
declare function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>];

/**
 * Manage sessionStorage data with React state synchronization.
 * Similar to useLocalStorage but uses sessionStorage instead.
 *
 * @param key - The sessionStorage key to store the value under
 * @param initialValue - The initial value to use if no stored value exists
 * @returns A tuple containing the current value and a setter function
 *
 * @example
 * ```tsx
 * const [session, setSession] = useSessionStorage("sessionId", "");
 *
 * return (
 *   <div>
 *     <p>Session: {session}</p>
 *     <button onClick={() => setSession("abc123")}>Set Session</button>
 *   </div>
 * );
 * ```
 */
declare function useSessionStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>];

/**
 * Manage boolean state easily with toggle functionality.
 * Provides a simple way to handle on/off states.
 *
 * @param initialValue - The initial boolean value (default: false)
 * @returns A tuple with the current value, a toggle function, and setter functions
 *
 * @example
 * ```tsx
 * const [isOpen, toggle, setTrue, setFalse] = useToggle(false);
 *
 * return (
 *   <div>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={setTrue}>Open</button>
 *     <button onClick={setFalse}>Close</button>
 *     {isOpen && <div>Content</div>}
 *   </div>
 * );
 * ```
 */
declare function useToggle(initialValue?: boolean): [
    boolean,
    () => void,
    () => void,
    () => void
];

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
declare function usePrevious<T>(value: T): T | undefined;

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
declare function useCounter(initialValue?: number, step?: number, min?: number, max?: number): {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    setValue: (value: number) => void;
};

/**
 * Detect online/offline network state.
 * Monitors the browser's online/offline status.
 *
 * @returns An object with `isOnline` boolean and `wasOffline` flag
 *
 * @example
 * ```tsx
 * const { isOnline, wasOffline } = useNetworkStatus();
 *
 * return (
 *   <div>
 *     {!isOnline && <p>You are offline</p>}
 *     {wasOffline && <p>You were offline but are now back online</p>}
 *   </div>
 * );
 * ```
 */
declare function useNetworkStatus(): {
    isOnline: boolean;
    wasOffline: boolean;
};

/**
 * Track window width and height.
 * Returns the current window dimensions and updates on resize.
 *
 * @returns An object with `width` and `height` properties
 *
 * @example
 * ```tsx
 * const { width, height } = useWindowSize();
 *
 * return (
 *   <div>
 *     Window size: {width} x {height}
 *   </div>
 * );
 * ```
 */
declare function useWindowSize(): {
    width: number;
    height: number;
};

/**
 * Listen to CSS media query changes.
 * Returns whether the media query currently matches.
 *
 * @param query - The CSS media query string (e.g., "(min-width: 768px)")
 * @returns `true` if the media query matches, `false` otherwise
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery("(max-width: 768px)");
 *
 * return <div>{isMobile ? "Mobile View" : "Desktop View"}</div>;
 * ```
 */
declare function useMediaQuery(query: string): boolean;

/**
 * Get scroll position and direction.
 * Tracks scroll position (x, y) and scroll direction.
 *
 * @returns An object with scroll position and direction
 *
 * @example
 * ```tsx
 * const { x, y, direction } = useScrollPosition();
 *
 * return (
 *   <div>
 *     <p>Scroll X: {x}, Y: {y}</p>
 *     <p>Direction: {direction}</p>
 *   </div>
 * );
 * ```
 */
declare function useScrollPosition(): {
    x: number;
    y: number;
    direction: "up" | "down" | null;
};

/**
 * Observe element dimensions via ResizeObserver.
 * Tracks the width and height of a DOM element.
 *
 * @param ref - A ref to the element to observe
 * @returns An object with `width` and `height` properties
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * const { width, height } = useElementSize(ref);
 *
 * return (
 *   <div ref={ref}>
 *     <p>Width: {width}px, Height: {height}px</p>
 *   </div>
 * );
 * ```
 */
declare function useElementSize<T extends HTMLElement>(ref: RefObject<T>): {
    width: number;
    height: number;
};

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
declare function useClipboard(): {
    copiedText: string | null;
    copy: (text: string) => Promise<boolean>;
};
/**
 * @deprecated Use `useClipboard` instead. This will be removed in a future version.
 */
declare const useCopyToClipboard: typeof useClipboard;

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
declare function useDarkMode(initialValue?: "light" | "dark" | "system"): {
    theme: "light" | "dark";
    themePreference: "light" | "dark" | "system";
    toggle: () => void;
    setDark: () => void;
    setLight: () => void;
    setSystem: () => void;
};

/**
 * Detect if page is visible or hidden.
 * Uses the Page Visibility API to track when the tab/window is visible.
 *
 * @returns `true` if the page is visible, `false` if hidden
 *
 * @example
 * ```tsx
 * const isVisible = usePageVisibility();
 *
 * useEffect(() => {
 *   if (!isVisible) {
 *     // Pause video, animations, etc.
 *   }
 * }, [isVisible]);
 * ```
 */
declare function usePageVisibility(): boolean;

/**
 * Detect user inactivity.
 * Tracks when the user has been idle (no mouse, keyboard, or touch activity) for a specified time.
 *
 * @param timeout - The idle timeout in milliseconds (default: 30000)
 * @param events - Array of events to listen for (default: ["mousedown", "mousemove", "keypress", "scroll", "touchstart"])
 * @returns An object with `isIdle` boolean and `reset` function
 *
 * @example
 * ```tsx
 * const { isIdle, reset } = useIdleTimer(5000);
 *
 * return (
 *   <div>
 *     {isIdle && <p>You've been idle for 5 seconds</p>}
 *     <button onClick={reset}>Reset Timer</button>
 *   </div>
 * );
 * ```
 */
declare function useIdleTimer(timeout?: number, events?: string[]): {
    isIdle: boolean;
    reset: () => void;
};

/**
 * Delay value updates until after a specified delay period.
 * Useful for reducing API calls or expensive computations.
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 500)
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * const [search, setSearch] = useState("");
 * const debouncedSearch = useDebounce(search, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearch) {
 *     // Perform search API call
 *   }
 * }, [debouncedSearch]);
 * ```
 */
declare function useDebounce<T>(value: T, delay?: number): T;

/**
 * Limit how often a function can be called.
 * Ensures the function is called at most once per delay period.
 *
 * @param callback - The function to throttle
 * @param delay - The delay in milliseconds between allowed calls
 * @returns A throttled version of the callback
 *
 * @example
 * ```tsx
 * const handleScroll = useThrottle(() => {
 *   console.log("Scroll event");
 * }, 200);
 *
 * useEffect(() => {
 *   window.addEventListener("scroll", handleScroll);
 *   return () => window.removeEventListener("scroll", handleScroll);
 * }, [handleScroll]);
 * ```
 */
declare function useThrottle<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void;

/**
 * Fetch data with loading, error, and data states.
 * A convenient hook for handling async data fetching.
 *
 * @param url - The URL to fetch from (can be null to skip fetching)
 * @param options - Fetch options (same as native fetch API)
 * @returns An object with `data`, `loading`, `error`, and `refetch` function
 *
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useFetch<User>("https://api.example.com/user");
 *
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return <div>{data?.name}</div>;
 * ```
 */
declare function useFetch<T = any>(url: string | null, options?: RequestInit): {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
};

/**
 * Detect clicks outside of a specified element.
 * Useful for closing modals, dropdowns, or popovers.
 *
 * @param ref - A ref to the element to detect clicks outside of
 * @param callback - Function to call when a click outside is detected
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 *
 * useClickOutside(ref, () => {
 *   setIsOpen(false);
 * });
 *
 * return <div ref={ref}>Content</div>;
 * ```
 */
declare function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void): void;

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
declare function useKeyPress(targetKey: string | string[]): boolean;

/**
 * Add and clean up event listeners safely.
 * A generic hook for attaching event listeners to DOM elements or the window.
 *
 * @param eventName - The event name to listen for
 * @param handler - The event handler function
 * @param element - The element to attach the listener to (default: window)
 * @param options - Event listener options (e.g., { passive: true })
 *
 * @example
 * ```tsx
 * useEventListener("scroll", () => {
 *   console.log("Window scrolled");
 * });
 *
 * const ref = useRef<HTMLDivElement>(null);
 * useEventListener("click", handleClick, ref);
 * ```
 */
declare function useEventListener<T extends HTMLElement = HTMLElement>(eventName: string, handler: (event: Event) => void, element?: RefObject<T> | null, options?: boolean | AddEventListenerOptions): void;

export { useClickOutside, useClipboard, useCopyToClipboard, useCounter, useDarkMode, useDebounce, useElementSize, useEventListener, useFetch, useIdleTimer, useKeyPress, useLocalStorage, useMediaQuery, useNetworkStatus, usePageVisibility, usePrevious, useScrollPosition, useSessionStorage, useThrottle, useToggle, useWindowSize };
