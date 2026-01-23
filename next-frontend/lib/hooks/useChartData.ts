import { useState, useEffect, useCallback } from 'react';
import { isAxiosError } from 'axios';
import axios from '@/lib/axios';
import { getCookie } from '@/lib/cookies';

interface UseChartDataResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useChartData<T>(endpoint: string): UseChartDataResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const token = getCookie('token');

            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }

            const response = await axios.get(endpoint, {
                params: { _t: new Date().getTime() },
                headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
            });

            setData(response.data);
        } catch (err: unknown) {
            console.error(`Failed to fetch data from ${endpoint}:`, err);

            let status: number | undefined;
            let message: string | undefined;

            if (isAxiosError(err)) {
                status = err.response?.status;
                message = err.message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            const errorMessage = status === 401
                ? 'Authentication failed. Please log in again.'
                : message || 'Failed to load data. Please try again.';

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Listen for global refresh event
    useEffect(() => {
        const handleRefresh = () => {
            console.log(`Global refresh triggered for endpoint: ${endpoint}`);
            fetchData();
        };

        window.addEventListener('cost-data-updated', handleRefresh);
        return () => window.removeEventListener('cost-data-updated', handleRefresh);
    }, [fetchData, endpoint]);

    return { data, loading, error, refetch: fetchData };
}
