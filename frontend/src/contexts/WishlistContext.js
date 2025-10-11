import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { authAPI } from '../services/api';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WISHLIST':
      return { ...state, items: action.payload, loading: false };
    
    case 'ADD_ITEM':
      if (state.items.find(item => item._id === action.payload._id)) {
        return state; // Item already in wishlist
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    
    case 'CLEAR_WISHLIST':
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

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  const addToWishlist = useCallback(async (product) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // API call to add to wishlist would go here
      dispatch({ type: 'ADD_ITEM', payload: product });
      enqueueSnackbar('Added to wishlist', { 
        variant: 'success',
        autoHideDuration: 3000 
      });
    } catch (error) {
      enqueueSnackbar('Failed to add to wishlist', { 
        variant: 'error',
        autoHideDuration: 3000 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [enqueueSnackbar]);

  const removeFromWishlist = useCallback(async (productId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // API call to remove from wishlist would go here
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
      enqueueSnackbar('Removed from wishlist', { 
        variant: 'info',
        autoHideDuration: 3000 
      });
    } catch (error) {
      enqueueSnackbar('Failed to remove from wishlist', { 
        variant: 'error',
        autoHideDuration: 3000 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [enqueueSnackbar]);

  const clearWishlist = useCallback(() => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    enqueueSnackbar('Wishlist cleared', { 
      variant: 'info',
      autoHideDuration: 3000 
    });
  }, [enqueueSnackbar]);

  const wishlistCount = state.items.length;
  const isInWishlist = (productId) => state.items.some(item => item._id === productId);

  const value = {
    items: state.items,
    loading: state.loading,
    wishlistCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};