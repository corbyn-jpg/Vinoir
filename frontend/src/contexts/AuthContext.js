import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload,
        error: null 
      };
    case 'AUTH_FAIL':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: false, 
        user: null,
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null,
        error: null 
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('vinoir_token');
      if (token) {
        try {
          dispatch({ type: 'AUTH_START' });
          const userData = await authAPI.getProfile();
          dispatch({ type: 'AUTH_SUCCESS', payload: userData });
        } catch (error) {
          localStorage.removeItem('vinoir_token');
          dispatch({ type: 'AUTH_FAIL', payload: error.message });
        }
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const { user, token } = await authAPI.login({ email, password });
      localStorage.setItem('vinoir_token', token);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      const { user, token } = await authAPI.register(userData);
      localStorage.setItem('vinoir_token', token);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('vinoir_token');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};