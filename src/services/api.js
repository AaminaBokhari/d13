import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: '/api/doctor', // Updated to use doctor-specific endpoints
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('doctor_token'); // Updated token key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('doctor_token');
      window.location.href = '/login';
    }

    const errorMessage = error.response?.data?.message || 'An error occurred';
    toast.error(errorMessage);
    
    return Promise.reject(error);
  }
);

export default api;