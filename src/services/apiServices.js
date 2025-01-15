// Helper functions for token management

import { useAuth } from '../features/AuthStack/AuthContext';
import axiosInstance from './axiosInstance';
import {saveToken} from './tokenStorage';

 const loginUser = async credentials => {
    const { login } = useAuth();
  try {
    const response = await axiosInstance.post('/login', credentials);

    const {token, user} = response.data;
    await saveToken(token);

    return {token, user};
  } catch (error) {
    // Handle errors (e.g., invalid credentials)
    throw error.response?.data?.message || error.message || 'Login failed';
  }
};

export {loginUser};
