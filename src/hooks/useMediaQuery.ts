import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const isClient = typeof window !== "undefined";
  const [matches, setMatches] = useState<boolean>(() => isClient ? window.matchMedia(query).matches : false);

  useEffect(() => {
    if (!isClient) return;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    setMatches(media.matches);
    return () => media.removeEventListener("change", listener);
  }, [query, isClient]);

  return matches;
}
