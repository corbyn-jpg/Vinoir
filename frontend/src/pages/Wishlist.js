import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { Favorite, ShoppingBag, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ui/ProductCard';

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Favorite sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Your wishlist is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Save your favorite fragrances here for later
        </Typography>
        <Button variant="contained" size="large" component={Link} to="/shop">
          Explore Fragrances
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontFamily: 'Playfair Display' }}>
          My Wishlist ({items.length})
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Delete />}
          onClick={clearWishlist}
          color="error"
        >
          Clear All
        </Button>
      </Box>

      <Grid container spacing={3}>
        {items.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingBag />}
          component={Link}
          to="/shop"
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default Wishlist;