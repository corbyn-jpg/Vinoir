import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { Add, Remove, Delete, ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, cartTotal, cartCount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  const subtotal = cartTotal;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Discover our luxury fragrance collection and add some items to your cart
        </Typography>
        <Button variant="contained" size="large" component={Link} to="/shop">
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
        Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img
                            src={item.images?.[0]?.url || '/images/placeholder-product.jpg'}
                            alt={item.name}
                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" component={Link} to={`/product/${item._id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.category}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            size="small"
                            sx={{ width: 60 }}
                            inputProps={{ 
                              style: { textAlign: 'center' },
                              min: 1
                            }}
                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 1)}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button component={Link} to="/shop" variant="outlined">
              Continue Shopping
            </Button>
            <Button onClick={clearCart} color="error" variant="outlined">
              Clear Cart
            </Button>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            
            <Box sx={{ my: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Tax</Typography>
                <Typography variant="body1">${tax.toFixed(2)}</Typography>
              </Box>
              
              {shipping > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Free shipping on orders over $100
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ${total.toFixed(2)}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCheckout}
              disabled={items.length === 0}
            >
              Proceed to Checkout
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Secure checkout · Free returns
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;