import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { CheckCircle, ShoppingBag, Home } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Order Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          We couldn't find your order details. Please check your order history or contact support.
        </Typography>
        <Button variant="contained" component={Link} to="/orders">
          View Orders
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
          Order Confirmed!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Thank you for your purchase
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Order #{order.orderNumber}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Order Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Details
            </Typography>
            
            <List>
              {order.items.map((item, index) => (
                <ListItem key={index} divider>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <img
                      src={item.images?.[0]?.url || '/images/placeholder-product.jpg'}
                      alt={item.name}
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.category} • Qty: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">${order.total.toFixed(2)}</Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Shipping Information
            </Typography>
            <Typography variant="body1">
              {order.shipping.firstName} {order.shipping.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.shipping.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.shipping.country}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Email: {order.shipping.email}
              {order.shipping.phone && ` • Phone: ${order.shipping.phone}`}
            </Typography>
          </Paper>
        </Grid>

        {/* Order Summary & Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              <Box sx={{ my: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Order Total</Typography>
                  <Typography variant="body2">${order.total.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Payment Method</Typography>
                  <Typography variant="body2">Credit Card</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Shipping Method</Typography>
                  <Typography variant="body2">Standard</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                A confirmation email has been sent to {order.shipping.email}
              </Typography>

              <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingBag />}
                component={Link}
                to="/orders"
                sx={{ mb: 2 }}
              >
                View Order Details
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Home />}
                component={Link}
                to="/"
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                What's Next?
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Order Processing" 
                    secondary="Your order is being prepared for shipment" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Shipping" 
                    secondary="Expected delivery in 3-5 business days" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Tracking" 
                    secondary="You'll receive a tracking number via email" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderConfirmation;