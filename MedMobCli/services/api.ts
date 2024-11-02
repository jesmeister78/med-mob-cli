import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { env } from '../environment';
import { userService } from './userService';

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
    // Private axios instance
    const api: AxiosInstance = axios.create({
        baseURL: env.XRAI_API_HOST,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Private handlers
    const authInterceptor = async (config: any) => {
        const token = await userService.getTokenAsync();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    };

    const handleAuthError = async (error: AxiosError) => {
        if (error.response?.status === 401) {
            await userService.removeTokenAsync();
        }
        throw error;
    };
    /*
    {
                'error': 'Bad Request',
                'message': str(error),
                'status_code': 400
            }
    */
    const handleApiError = (error: any) => {
        console.log("error received: "+JSON.stringify(error));

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
                await handleAuthError(error);
            } catch (authError) {
                handleApiError(authError);
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