"use client";

import { useCallback, useRef, useState } from "react";

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseAsyncOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for handling async operations
 * Provides loading, error, and success states
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true,
  options?: UseAsyncOptions
) {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const executeAsync = useCallback(async () => {
    setState({ data: null, loading: true, error: null });

    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
      options?.onSuccess?.();
      return response;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setState({ data: null, loading: false, error: err });
      options?.onError?.(err);
      throw err;
    }
  }, [asyncFunction, options]);

  // Execute on mount if immediate is true
  const mountedRef = useRef(false);
  if (immediate && !mountedRef.current) {
    mountedRef.current = true;
    executeAsync().catch(() => {
      // Error is already handled in state
    });
  }

  return { ...state, execute: executeAsync };
}

/**
 * Custom hook for handling async operations with pagination
 */
export function useAsyncPaginated<T>(
  asyncFunction: (
    page: number,
    limit: number
  ) => Promise<{ data: T[]; total: number }>
) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, loading, error, execute } = useAsync(
    () => asyncFunction(page, limit),
    true
  );

  const nextPage = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((p) => (p > 1 ? p - 1 : 1));
  }, []);

  const goToPage = useCallback((p: number) => {
    setPage(Math.max(1, p));
  }, []);

  return {
    data: data?.data || [],
    total: data?.total || 0,
    page,
    limit,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
    setLimit,
    refetch: execute,
  };
}

/**
 * Custom hook for form submission
 */
export function useAsyncSubmit<T, R = unknown>(
  asyncFunction: (data: T) => Promise<R>,
  options?: UseAsyncOptions
) {
  const [state, setState] = useState<UseAsyncState<R>>({
    data: null,
    loading: false,
    error: null,
  });

  const submit = useCallback(
    async (data: T) => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await asyncFunction(data);
        setState({ data: response, loading: false, error: null });
        options?.onSuccess?.();
        return response;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        setState({ data: null, loading: false, error: err });
        options?.onError?.(err);
        throw err;
      }
    },
    [asyncFunction, options]
  );

  return { ...state, submit };
}

/**
 * Custom hook for debouncing values
 */
export function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debounce = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  }, [value, delay]);

  debounce();

  return debouncedValue;
}
