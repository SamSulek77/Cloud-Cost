import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import axios from '@/lib/axios';
import { User } from '@/types';
import { API_ENDPOINTS } from '@/lib/constants';
import { getCookie, removeCookie } from '@/lib/cookies';

interface UseAuthResult {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export function useAuth(requireAuth = true): UseAuthResult {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {


            // ...

            try {
                setLoading(true);
                const token = getCookie('token');

                if (!token) {
                    if (requireAuth) {
                        // Middleware should have handled this, but just in case:
                        router.push('/login');
                    } else {
                        setLoading(false);
                    }
                    return;
                }

                const response = await axios.get<User>(API_ENDPOINTS.USER_PROFILE);

                setUser(response.data);
                setError(null);
            } catch (err: unknown) {
                console.error('Failed to fetch user:', err);
                setError('Failed to authenticate user.');

                const isAuthError = isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403);

                if (requireAuth && isAuthError) {
                    removeCookie('token');
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router, requireAuth]);

    return { user, loading, error };
}
