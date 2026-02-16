import axios from 'axios';
// how to use this api instance in your components:
// import api from '@/utils/api';
// api.get('/your-endpoint').then(response => {
//     console.log(response.data);
// }).catch(error => {
//     console.error('API error:', error);
// });

const api = axios.create({
    baseUrl: 'http://localhost:8086/v2',
});

// Add a request interceptor to include the token in the headers

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login page
            console.error('Unauthorized access - redirecting to login');
            // You can add your redirection logic here
        }
        return Promise.reject(error);
    }
);

export default api;