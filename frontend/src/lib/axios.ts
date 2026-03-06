import axios from 'axios'
import { redirect } from '@tanstack/react-router';
import { Route as RouteLogin } from '@/routes/_guest/login';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json"
    },
    timeout: 3000,
});

api.interceptors.response.use(
    response => response,
    error => {
        // Validate XSRF and User session
        if (error.response?.status === 419 || error.response?.status === 401) {
            throw redirect({ to: RouteLogin.to });
        }

        return Promise.reject(error);
    }
);

export default api
