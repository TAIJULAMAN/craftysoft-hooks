// State Management Hooks
export * from "./hooks/useLocalStorage"; // Store and sync data with localStorage
export * from "./hooks/useSessionStorage"; // Manage sessionStorage data
export * from "./hooks/useToggle"; // Manage boolean state easily
export * from "./hooks/usePrevious"; // Track previous state/value
export * from "./hooks/useCounter"; // Simple counter with increment/decrement/reset

// Browser Hooks
export * from "./hooks/useNetworkStatus"; // Detect online/offline state
export * from "./hooks/useWindowSize"; // Track window width and height
export * from "./hooks/useMediaQuery"; // Listen to CSS media query changes
export * from "./hooks/useScrollPosition"; // Get scroll position and direction
export * from "./hooks/useElementSize"; // Observe element dimensions via ResizeObserver

// Utility Hooks
export * from "./hooks/useCopyToClipboard"; // Copy text to clipboard (exports useClipboard and deprecated useCopyToClipboard)
export * from "./hooks/useDarkMode"; // Toggle and persist dark/light mode
export * from "./hooks/usePageVisibility"; // Detect if page is visible or hidden
export * from "./hooks/useIdleTimer"; // Detect user inactivity

// Performance Hooks
export * from "./hooks/useDebounce"; // Delay value or function updates
export * from "./hooks/useThrottle"; // Limit how often a function runs

// API Hooks
export * from "./hooks/useFetch"; // Fetch data with loading/error states

// Interaction Hooks
export * from "./hooks/useClickOutside"; // Detect clicks outside an element
export * from "./hooks/useKeyPress"; // Detect key presses
export * from "./hooks/useEventListener"; // Add and clean up event listeners safely
