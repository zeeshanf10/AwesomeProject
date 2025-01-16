// Helper functions for token management

import axiosInstance from './axiosInstance';


export const loginUser = async (credentials, login) => {
  try {
    const response = await axiosInstance.post('/login', credentials);

    const {token, user} = response.data;
    await login(token);

    return {token, user};
  } catch (error) {
    // Handle errors (e.g., invalid credentials)
    throw error.response?.data?.message || error.message || 'Login failed';
  }
};
