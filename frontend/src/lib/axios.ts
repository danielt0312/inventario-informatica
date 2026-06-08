import axios from 'axios';

export const root = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
    withXSRFToken: true,
    timeout: 3000
});

export const api = root.create({
    headers: {
        'Accept': 'application/json'
    }
});

export default api;
