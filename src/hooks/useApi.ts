import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

/**
 * useApi Hook
 * Standardized hook for making API requests with state management.
 */
export function useApi<T, Args extends any[] = any[]>(
    apiFunc: (...args: Args) => Promise<AxiosResponse<T>>
) {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const request = useCallback(
        async (...args: Args) => {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            try {
                const response = await apiFunc(...args);
                setState({ data: response.data, loading: false, error: null });
                return response.data;
            } catch (err: any) {
                const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
                setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
                throw err;
            }
        },
        [apiFunc]
    );

    const retry = useCallback((...args: Args) => request(...args), [request]);

    return {
        ...state,
        request,
        retry,
    };
}
