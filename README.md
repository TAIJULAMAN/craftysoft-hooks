# 🧩 craftysoft/hooks

A lightweight collection of **essential React hooks** for modern frontend developers.

##  Installation
```bash
npm install @craftysoft/hooks
```

##  Usage Example
```tsx
import { useLocalStorage, useDebounce } from "@craftysoft/hooks";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const debounced = useDebounce(theme, 300);

  return (
    <div>
      <p>Theme: {debounced}</p>
      <button onClick={() => setTheme("dark")}>Dark</button>
    </div>
  );
}
```

##  Hooks List
- `useLocalStorage`
- `useDebounce`
- `useThrottle`
- `useClickOutside`
- `useCopyToClipboard`
- `useMediaQuery`
- `useWindowSize`

##  License
MIT © Md Shah Aman Patwary
