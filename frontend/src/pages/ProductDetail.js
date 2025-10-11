import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  Rating,
  Tabs,
  Tab,
  Card,
  CardContent,
  Alert,
  Skeleton,
  IconButton
} from '@mui/material';
import { AddShoppingCart, Favorite, FavoriteBorder, Share, Remove, Add } from '@mui/icons-material';

import ImageGallery from '../components/ui/ImageGallery';
import { productAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const inWishlist = product ? isInWishlist(product._id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getById(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: `/product/${id}` } });
      return;
    }

    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a snackbar notification here
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={100} />
            <Skeleton variant="rectangular" height={50} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Product not found'}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/shop')}>
          Back to Shop
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={6}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <ImageGallery images={product.images} productName={product.name} />
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            {/* Header */}
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={4.5} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  (24 reviews)
                </Typography>
              </Box>
            </Box>

            {/* Category & Size */}
            <Stack direction="row" spacing={1}>
              <Chip label={product.category} variant="outlined" />
              {product.size && <Chip label={product.size} variant="outlined" />}
              {product.featured && <Chip label="Featured" color="primary" />}
            </Stack>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {product.description}
            </Typography>

            {/* Stock Status */}
            <Alert 
              severity={product.stock > 0 ? "success" : "error"}
              sx={{ width: 'fit-content' }}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Alert>

            {/* Quantity Selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6">Quantity:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <IconButton onClick={decreaseQuantity} disabled={quantity <= 1}>
                  <Remove />
                </IconButton>
                <Typography sx={{ px: 2, minWidth: 40, textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton onClick={increaseQuantity}>
                  <Add />
                </IconButton>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button
                variant="contained"
                size="large"
                startIcon={<AddShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                sx={{ flex: 1, minWidth: 200 }}
              >
                Add to Cart
              </Button>
              
              <IconButton
                onClick={handleWishlistToggle}
                color={inWishlist ? "error" : "default"}
                size="large"
                sx={{ border: 1, borderColor: 'divider' }}
              >
                {inWishlist ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              
              <IconButton
                onClick={handleShare}
                size="large"
                sx={{ border: 1, borderColor: 'divider' }}
              >
                <Share />
              </IconButton>
            </Stack>

            {/* Additional Info */}
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    ✓ Free shipping on orders over $100
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ✓ 30-day return policy
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ✓ Authenticity guaranteed
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Fragrance Notes" />
          <Tab label="Details" />
          <Tab label="Shipping & Returns" />
        </Tabs>

        <Divider />

        <Box sx={{ py: 3 }}>
          {activeTab === 0 && product.fragranceNotes && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom color="primary">
                  Top Notes
                </Typography>
                <Stack spacing={1}>
                  {product.fragranceNotes.topNotes?.map((note, index) => (
                    <Chip key={index} label={note} variant="outlined" />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom color="primary">
                  Middle Notes
                </Typography>
                <Stack spacing={1}>
                  {product.fragranceNotes.middleNotes?.map((note, index) => (
                    <Chip key={index} label={note} variant="outlined" />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom color="primary">
                  Base Notes
                </Typography>
                <Stack spacing={1}>
                  {product.fragranceNotes.baseNotes?.map((note, index) => (
                    <Chip key={index} label={note} variant="outlined" />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          )}
          {activeTab === 1 && (
            <Typography>
              Additional product details and specifications would go here...
            </Typography>
          )}
          {activeTab === 2 && (
            <Typography>
              Shipping and return policy information...
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail;