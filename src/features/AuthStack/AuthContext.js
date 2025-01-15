import React, { createContext, useState, useEffect, useContext } from 'react';
import { clearToken, getToken, saveToken } from '../../services/tokenStorage';

// Create the AuthContext
const AuthContext = createContext();

// Provide the AuthContext
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check token on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = await getToken();
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (token) => {
    await saveToken(token);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = async () => {
    await clearToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
