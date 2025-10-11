import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const showLoading = (message = '') => {
    setLoading(true);
    setLoadingMessage(message);
  };

  const hideLoading = () => {
    setLoading(false);
    setLoadingMessage('');
  };

  const value = {
    loading,
    loadingMessage,
    showLoading,
    hideLoading,
    setLoadingMessage
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};