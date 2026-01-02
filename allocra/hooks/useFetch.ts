/**
 * useFetch Hook
 *
 * Simple data fetching hook with loading and error states.
 * For Allocra API endpoints.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FetchOptions extends RequestInit {
  skip?: boolean; // Skip initial fetch
}

interface UseFetchReturn<T> extends FetchState<T> {
  refetch: () => Promise<void>;
  mutate: (newData: T | null) => void;
}

export default function useFetch<T = unknown>(
  url: string | null,
  options?: FetchOptions
): UseFetchReturn<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: !options?.skip && !!url,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!url) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      
      // Allocra API returns { success, data } format
      const data = json.data !== undefined ? json.data : json;
      
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('An error occurred'),
      });
    }
  }, [url, options]);

  // Initial fetch
  useEffect(() => {
    if (!options?.skip && url) {
      fetchData();
    }
  }, [url, options?.skip, fetchData]);

  // Manual refetch
  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Manually update data (optimistic updates)
  const mutate = useCallback((newData: T | null) => {
    setState((prev) => ({ ...prev, data: newData }));
  }, []);

  return {
    ...state,
    refetch,
    mutate,
  };
}

/**
 * Helper for POST/PUT/PATCH/DELETE requests
 */
export function useMutation<TData = unknown, TVariables = unknown>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables?: TVariables): Promise<TData | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: variables ? JSON.stringify(variables) : undefined,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        return json.data !== undefined ? json.data : json;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [url, method]
  );

  return { mutate, loading, error };
}
