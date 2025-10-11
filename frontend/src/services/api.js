import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vinoir_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('vinoir_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Safe data extractor - ensures we always get an array for product lists
const getProductsArray = (data) => {
  if (Array.isArray(data)) {
    return data;
  } else if (data && Array.isArray(data.products)) {
    return data.products;
  } else if (data && Array.isArray(data.items)) {
    return data.items;
  } else if (data && data.data && Array.isArray(data.data)) {
    return data.data;
  }
  console.warn('Expected array but got:', data);
  return [];
};

// Product API - FIXED VERSION
export const productAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return getProductsArray(response.data);
    } catch (error) {
      console.error('Error fetching all products:', error);
      return []; // Return empty array instead of throwing
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product by id:', error);
      return null; // Return null instead of throwing
    }
  },

  getFeatured: async () => {
    try {
      const response = await api.get('/products/featured');
      return getProductsArray(response.data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return []; // Return empty array instead of throwing
    }
  },

  search: async (query) => {
    try {
      const response = await api.get('/products/search', { params: { q: query } });
      return getProductsArray(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
      return []; // Return empty array instead of throwing
    }
  }
};

// Auth API - keep as is since they handle errors differently
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || 'Login failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || 'Registration failed');
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || 'Failed to fetch profile');
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.patch('/auth/profile', userData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || 'Failed to update profile');
    }
  }
};

// Order API - keep as is
export const orderAPI = {
  create: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || 'Order creation failed');
    }
  },

  getByUser: async () => {
    try {
      const response = await api.get('/orders/user');
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || 'Failed to fetch orders');
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message || 'Failed to fetch order');
    }
  }
};

export default api;