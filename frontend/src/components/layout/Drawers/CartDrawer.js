import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import the hooks - adjust the path based on your project structure
import { useCart } from '../../../contexts/CartContext';

const CartDrawer = ({ open, onClose }) => {
  // Safe context usage with fallbacks
  const { 
    cartItems = [], 
    updateQuantity = () => {}, 
    removeFromCart = () => {},
    getCartTotal = () => 0,
    getCartCount = () => 0 
  } = useCart?.() || {};
  
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/shop');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          p: 2
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Shopping Cart ({getCartCount()})
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Button variant="contained" onClick={handleContinueShopping} sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <List sx={{ flexGrow: 1, overflow: 'auto' }}>
            {cartItems.map((item) => (
              <ListItem key={item.id} divider>
                <Box sx={{ mr: 2 }}>
                  <img
                    src={item.image || '/api/placeholder/60/60'}
                    alt={item.name}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                </Box>
                
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price}`}
                />
                
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    
                    <TextField
                      size="small"
                      value={item.quantity || 1}
                      inputProps={{
                        style: { textAlign: 'center', width: 40 }
                      }}
                      variant="outlined"
                      disabled
                    />
                    
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                    
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                ${getCartTotal().toFixed(2)}
              </Typography>
            </Box>
            
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCheckout}
              sx={{ mb: 1 }}
            >
              Proceed to Checkout
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;