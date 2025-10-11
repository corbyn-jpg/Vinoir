import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box
} from '@mui/material';
import { Home, ShoppingBag } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: '4rem', md: '6rem' },
          fontWeight: 'bold',
          color: 'text.secondary',
          fontFamily: 'Playfair Display'
        }}
      >
        404
      </Typography>
      
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
        Page Not Found
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
        The page you're looking for doesn't exist or has been moved. 
        Let's get you back to exploring our fragrance collection.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Home />}
          component={Link}
          to="/"
        >
          Go Home
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ShoppingBag />}
          component={Link}
          to="/shop"
        >
          Start Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;