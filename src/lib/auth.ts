import { useState, useEffect } from 'react';
import { fetchApi } from './api';
import { useRouter } from 'next/navigation';

export interface User {
    id: string;
    username: string;
    role: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in on mount
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<User> => {
        try {
            const response = await fetchApi<LoginResponse>('/admin/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                requireAuth: false,
            });

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            return response.user;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
    };
}
