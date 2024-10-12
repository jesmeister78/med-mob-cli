import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from '../environment';
import { useAppDispatch } from '../hooks';
import { setError } from '../store/errors';

// Create a base axios instance
const api: AxiosInstance = axios.create({
    baseURL: env.XRAI_API_HOST,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for authentication if needed
api.interceptors.request.use(
    (config) => {
        // You can add auth token here if required
        // const token = getToken(); // Implement this function to retrieve the token
        // if (token) {
        //   config.headers['Authorization'] = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        Promise.reject(error)
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle general errors here
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api;
