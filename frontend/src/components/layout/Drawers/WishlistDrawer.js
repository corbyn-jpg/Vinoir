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
  ListItemSecondaryAction
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  AddShoppingCart as AddToCartIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import the hooks - adjust the path based on your project structure
import { useWishlist } from '../../../contexts/WishlistContext';
import { useCart } from '../../../contexts/CartContext';

const WishlistDrawer = ({ open, onClose }) => {
  // Safe context usage with fallbacks
  const { 
    wishlistItems = [], 
    removeFromWishlist = () => {}, 
    clearWishlist = () => {} 
  } = useWishlist?.() || {};
  
  const { addToCart = () => {} } = useCart?.() || {};
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleViewWishlist = () => {
    onClose();
    navigate('/wishlist');
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
          Wishlist ({wishlistItems.length})
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {wishlistItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Button variant="contained" onClick={handleContinueShopping} sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <List sx={{ flexGrow: 1, overflow: 'auto' }}>
            {wishlistItems.map((item) => (
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
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleAddToCart(item)}
                    >
                      <AddToCartIcon />
                    </IconButton>
                    
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleViewWishlist}
              sx={{ mb: 1 }}
            >
              View Full Wishlist
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={clearWishlist}
              sx={{ mb: 1 }}
            >
              Clear Wishlist
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

export default WishlistDrawer;