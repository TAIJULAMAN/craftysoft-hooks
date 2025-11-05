import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "../useCounter";

describe("useCounter", () => {
  it("should initialize with 0 by default", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  it("should initialize with provided initial value", () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);
  });

  it("should increment by default step (1)", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("should increment by custom step", () => {
    const { result } = renderHook(() => useCounter(0, 5));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(5);
  });

  it("should decrement by default step (1)", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });

  it("should respect min value", () => {
    const { result } = renderHook(() => useCounter(5, 1, 0, 10));

    act(() => {
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
      result.current.decrement(); // Should not go below 0
    });

    expect(result.current.count).toBe(0);
  });

  it("should respect max value", () => {
    const { result } = renderHook(() => useCounter(5, 1, 0, 10));

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
      result.current.increment();
      result.current.increment();
      result.current.increment(); // Should not go above 10
    });

    expect(result.current.count).toBe(10);
  });

  it("should reset to initial value", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });

  it("should set value", () => {
    const { result } = renderHook(() => useCounter(0, 1, 0, 10));

    act(() => {
      result.current.setValue(7);
    });

    expect(result.current.count).toBe(7);
  });

  it("should clamp setValue to min/max", () => {
    const { result } = renderHook(() => useCounter(5, 1, 0, 10));

    act(() => {
      result.current.setValue(15); // Should be clamped to 10
    });

    expect(result.current.count).toBe(10);

    act(() => {
      result.current.setValue(-5); // Should be clamped to 0
    });

    expect(result.current.count).toBe(0);
  });
});

