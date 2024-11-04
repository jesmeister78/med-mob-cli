
declare module 'axios' {
    export interface InternalAxiosRequestConfig {
        _retry?: boolean;
    }
}
import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { env } from '../environment';
import { userService } from './userService';
import { authService } from './authService';

export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public response?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const xraiApi = (() => {
    // State for refresh token handling
    let isRefreshing = false;
    let failedQueue: Array<{
        resolve: (token: string) => void;
        reject: (error: any) => void;
    }> = [];

    // Process queued requests
    const processQueue = (error: any = null, token: string | null = null) => {
        failedQueue.forEach(promise => {
            if (error) {
                promise.reject(error);
            } else {
                promise.resolve(token!);
            }
        });
        failedQueue = [];
    };

    // Private axios instance
    const api: AxiosInstance = axios.create({
        baseURL: env.XRAI_API_HOST,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Refresh tokens
    const refreshTokens = async (refreshToken: string) => {
        try {
            const response = await axios.post<{access_token: string, refresh_token: string}>(
                `${env.XRAI_API_HOST}${env.XRAI_API_ACCOUNT}/refresh`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // Private handlers
    const authInterceptor = async (config: InternalAxiosRequestConfig) => {
        const token = await authService.getAccessTokenAsync();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    };

    const handleAuthError = async (error: AxiosError) => {
        const originalRequest = error.config;
        if (!originalRequest) {
            throw error;
        }

        // Prevent infinite loops on refresh endpoint
        if (originalRequest.url?.includes('/account/refresh/')) {
            await authService.logoutUserAsync();
            throw error;
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Wait for the other refresh request to complete
                try {
                    const token = await new Promise<string>((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    });
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axios(originalRequest);
                } catch (err) {
                    throw err;
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = await authService.getRefreshTokenAsync();
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const tokens = await refreshTokens(refreshToken);
                await authService.setTokensAsync(tokens.access_token, tokens.refresh_token);

                originalRequest.headers['Authorization'] = `Bearer ${tokens.access_token}`;
                processQueue(null, tokens.access_token);
                
                return axios(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                await authService.logoutUserAsync();
                throw refreshError;
            } finally {
                isRefreshing = false;
            }
        }

        throw error;
    };

    const handleApiError = (error: any) => {
        console.log("error received: " + JSON.stringify(error));

        if (error.response?.error) {
            throw new ApiError(
                error.response.error,
                error.response.statusCode,
                error.response.data
            );
        }
        throw new ApiError(
            error.message || 'An unexpected error occurred',
            error.response?.status
        );
    };

    // Add interceptors
    api.interceptors.request.use(authInterceptor, error => Promise.reject(error));
    api.interceptors.response.use(
        response => response,
        async error => {
            try {
                return await handleAuthError(error);
            } catch (authError) {
                return handleApiError(authError);
            }
        }
    );

    // Public methods
    return {
        async get<T>(url: string, config?: AxiosRequestConfig) {
            try {
                const response = await api.get<T>(url, config);
                return response.data;
            } catch (error) {
                handleApiError(error);
            }
        },

        async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
            try {
                const response = await api.post<T>(url, data, config);
                return response.data;
            } catch (error) {
                handleApiError(error);
            }
        },

        async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
            try {
                const response = await api.put<T>(url, data, config);
                return response.data;
            } catch (error) {
                handleApiError(error);
            }
        },

        async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
            try {
                const response = await api.patch<T>(url, data, config);
                return response.data;
            } catch (error) {
                handleApiError(error);
            }
        },

        async delete<T>(url: string, config?: AxiosRequestConfig) {
            try {
                const response = await api.delete<T>(url, config);
                return response.data;
            } catch (error) {
                handleApiError(error);
            }
        }
    };
})();

export default xraiApi;