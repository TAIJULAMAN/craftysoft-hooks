import { useState, useEffect, useCallback } from "react";

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
export function useFetch<T = any>(
  url: string | null,
  options?: RequestInit
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

