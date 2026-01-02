import axios from 'axios';
import { getCookie } from './cookies';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to attach the token from cookies
instance.interceptors.request.use(
  (config) => {
    // Only access document.cookie on the client side
    if (typeof window !== 'undefined') {
      const token = getCookie('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;