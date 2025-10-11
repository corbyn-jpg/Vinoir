import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Chip,
  Rating
} from '@mui/material';
import { AddShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from 'notistack';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    enqueueSnackbar(`${product.name} added to cart`, { variant: 'success' });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      enqueueSnackbar('Please login to add to wishlist', { variant: 'warning' });
      return;
    }

    if (inWishlist) {
      removeFromWishlist(product._id);
      enqueueSnackbar('Removed from wishlist', { variant: 'info' });
    } else {
      addToWishlist(product);
      enqueueSnackbar('Added to wishlist', { variant: 'success' });
    }
  };

  if (viewMode === 'list') {
    return (
      <Card sx={{ display: 'flex', mb: 2, height: 200 }}>
        <CardMedia
          component="img"
          sx={{ width: 200, objectFit: 'cover' }}
          image={product.images?.[0]?.url || '/images/placeholder-product.jpg'}
          alt={product.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h6" component={Link} to={`/product/${product._id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {product.category} • {product.size}
                </Typography>
                <Rating value={product.rating} readOnly size="small" />
              </Box>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                ${product.price.toFixed(2)}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              {product.description.length > 150 
                ? `${product.description.substring(0, 150)}...` 
                : product.description
              }
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddShoppingCart />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
            <IconButton
              onClick={handleWishlistToggle}
              color={inWishlist ? "error" : "default"}
            >
              {inWishlist ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </CardActions>
        </Box>
      </Card>
    );
  }

  // Grid View (default)
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4
      }
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={product.images?.[0]?.url || '/images/placeholder-product.jpg'}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <IconButton
            onClick={handleWishlistToggle}
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
            }}
            color={inWishlist ? "error" : "default"}
          >
            {inWishlist ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
        {product.featured && (
          <Chip 
            label="Featured" 
            color="primary" 
            size="small"
            sx={{ position: 'absolute', top: 8, left: 8 }}
          />
        )}
        {product.stock === 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Chip label="Out of Stock" color="error" />
          </Box>
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component={Link} to={`/product/${product._id}`} sx={{ textDecoration: 'none', color: 'inherit', display: 'block', mb: 1 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.category}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviewCount})
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
          {product.description.length > 80 
            ? `${product.description.substring(0, 80)}...` 
            : product.description
          }
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          ${product.price.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;