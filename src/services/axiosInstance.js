import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Base URL for your API
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  'https://jn549f8x-8000.inc1.devtunnels.ms/user';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    // Add Authorization token if available
    const token = await getToken(); // Implement `getToken` to retrieve your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Handle request errors
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Any status code in the range 2xx triggers this
    return response;
  },
  error => {
    // Handle responses outside the range 2xx
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized errors (e.g., token expiry)
        console.log('Unauthorized: Redirecting to login...');
        // Optional: Clear token and redirect to login
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

// Example: Get token function (replace with your actual implementation)
async function getToken() {
  // Retrieve the token from AsyncStorage or another source
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (e) {
    console.error('Error fetching token:', e);
    return null;
  }
}
