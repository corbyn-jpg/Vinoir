import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  console.log('Cart reducer action:', action.type, action.payload);
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product, quantity = 1 } = action.payload;
      
      if (!product || !product._id) {
        console.error('Invalid product in ADD_TO_CART');
        return state;
      }

      const existingItemIndex = state.findIndex(item => item._id === product._id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const newState = state.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log('Updated existing item, new state:', newState);
        return newState;
      } else {
        // Add new item
        const newState = [...state, { ...product, quantity }];
        console.log('Added new item, new state:', newState);
        return newState;
      }

    case 'REMOVE_FROM_CART':
      const newState = state.filter(item => item._id !== action.payload);
      console.log('Removed item, new state:', newState);
      return newState;

    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item._id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);

    case 'CLEAR_CART':
      console.log('Clearing cart');
      return [];

    case 'LOAD_CART':
      console.log('Loading cart from storage:', action.payload);
      return action.payload;

    default:
      return state;
  }
};

// Get initial cart from localStorage
const getInitialCart = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem('vinoir_cart');
    if (cart) {
      const parsed = JSON.parse(cart);
      console.log('Loaded cart from localStorage:', parsed);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  
  return [];
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = getInitialCart();
    if (savedCart.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    console.log('Cart changed, saving to localStorage:', cart);
    try {
      localStorage.setItem('vinoir_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    console.log('addToCart called with:', product, quantity);
    
    if (!product || !product._id) {
      console.error('Invalid product in addToCart:', product);
      return;
    }

    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { product, quantity } 
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Calculate cart totals
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
  };

  const isInCart = (productId) => {
    return cart.some(item => item._id === productId);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};