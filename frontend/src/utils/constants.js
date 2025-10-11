// Application constants
export const APP_CONFIG = {
  NAME: 'Vinoir',
  VERSION: '1.0.0',
  DESCRIPTION: 'Luxury fragrances crafted with passion and precision'
};

// API endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: '/products/:id',
  FEATURED_PRODUCTS: '/products/featured',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_ME: '/auth/me',
  ORDERS: '/orders',
  USER_ORDERS: '/orders/user',
  WISHLIST: '/wishlist'
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'vinoir_token',
  CART_ITEMS: 'vinoir_cart',
  USER_PREFERENCES: 'vinoir_preferences'
};

// Product categories
export const PRODUCT_CATEGORIES = [
  'Eau de Parfum',
  'Eau de Toilette', 
  'Eau de Cologne',
  'Perfume Oil'
];

// Order statuses
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Payment methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer'
};

// Validation rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s-()]+$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  CARD_NUMBER: /^\d{16}$/,
  CVV: /^\d{3,4}$/
};