import axios from 'axios';
import { signup, login } from '../types/auth'; 

const API = axios.create({ baseURL: import.meta.env.VITE_API_ENDPOINT });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if(token) {
        req.headers.authorization = `Bearer ${token}`;
    }

    return req;
});

export const createMatch = () => API.get('/match/create');
export const joinMatch = (matchId: string) => API.get(`/match/join/${matchId}`);

export const logIn = (formData: login) => API.post('/auth/login', formData);
export const signUp = (formData: signup) => API.post('/auth/signup', formData);