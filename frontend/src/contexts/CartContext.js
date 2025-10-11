import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { useSnackbar } from 'notistack';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, loading: false };
    
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  loading: false
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  // Load cart from localStorage on mount
  React.useEffect(() => {
    const savedCart = localStorage.getItem('vinoir_cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('vinoir_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    enqueueSnackbar(`${product.name} added to cart`, { 
      variant: 'success',
      autoHideDuration: 3000 
    });
  }, [enqueueSnackbar]);

  const removeFromCart = useCallback((productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    enqueueSnackbar('Item removed from cart', { 
      variant: 'info',
      autoHideDuration: 3000 
    });
  }, [enqueueSnackbar]);

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
    enqueueSnackbar('Cart cleared', { 
      variant: 'info',
      autoHideDuration: 3000 
    });
  }, [enqueueSnackbar]);

  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value = {
    items: state.items,
    loading: state.loading,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
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