import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");
  });

  it("should debounce value updates", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "initial" },
      }
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated" });

    // Value should not change immediately
    expect(result.current).toBe("initial");

    // Fast-forward time
    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current).toBe("updated");
    });
  });

  it("should cancel previous debounce on rapid updates", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "first" },
      }
    );

    rerender({ value: "second" });
    vi.advanceTimersByTime(300);

    rerender({ value: "third" });
    vi.advanceTimersByTime(300);

    // Should still be "first" because we haven't waited full delay
    expect(result.current).toBe("first");

    vi.advanceTimersByTime(200);

    await waitFor(() => {
      expect(result.current).toBe("third");
    });
  });
});

