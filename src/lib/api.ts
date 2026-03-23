export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export class APIError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
        this.name = 'APIError';
    }
}

interface FetchOptions extends RequestInit {
    requireAuth?: boolean;
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { requireAuth = true, headers: customHeaders, ...config } = options;

    const headers = new Headers(customHeaders);
    headers.set('Content-Type', 'application/json');

    if (requireAuth) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        } else {
            // Handle missing token, e.g., redirect to login
            if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
            throw new APIError(401, 'Unauthorized');
        }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...config,
        headers,
    });

    if (!response.ok) {
        let errorMsg = 'An error occurred';
        try {
            const errorData = await response.json();
            errorMsg = errorData.error || errorData.message || errorMsg;
        } catch (e) {
            // Ignore JSON parse errors for non-JSON responses
        }

        if (response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }

        throw new APIError(response.status, errorMsg);
    }

    // Handle empty responses (like 204 No Content)
    const text = await response.text();
    return text ? JSON.parse(text) : (null as unknown as T);
}
