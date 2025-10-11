import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Divider,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = cartTotal;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const validateShipping = () => {
    const newErrors = {};
    Object.keys(shippingData).forEach(key => {
      if (!shippingData[key] && key !== 'phone') {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!paymentData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!paymentData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentData.cvv) newErrors.cvv = 'CVV is required';
    if (!paymentData.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && validateShipping()) {
      setActiveStep(1);
    } else if (activeStep === 1 && validatePayment()) {
      setActiveStep(2);
    } else if (activeStep === 2) {
      handlePlaceOrder();
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        items,
        shipping: shippingData,
        payment: paymentData,
        total,
        orderNumber: `VNO${Date.now()}`
      };
      
      // Clear cart and redirect to confirmation
      clearCart();
      navigate('/order-confirmation', { 
        state: { order: orderData } 
      });
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={shippingData.firstName}
                onChange={handleShippingChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={shippingData.lastName}
                onChange={handleShippingChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={shippingData.email}
                onChange={handleShippingChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={shippingData.phone}
                onChange={handleShippingChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={shippingData.address}
                onChange={handleShippingChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={shippingData.city}
                onChange={handleShippingChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="State"
                name="state"
                value={shippingData.state}
                onChange={handleShippingChange}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="ZIP Code"
                name="zipCode"
                value={shippingData.zipCode}
                onChange={handleShippingChange}
                error={!!errors.zipCode}
                helperText={errors.zipCode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Country"
                name="country"
                value={shippingData.country}
                onChange={handleShippingChange}
                error={!!errors.country}
                helperText={errors.country}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name on Card"
                name="nameOnCard"
                value={paymentData.nameOnCard}
                onChange={handlePaymentChange}
                error={!!errors.nameOnCard}
                helperText={errors.nameOnCard}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Card Number"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={handlePaymentChange}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={handlePaymentChange}
                error={!!errors.expiryDate}
                helperText={errors.expiryDate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="CVV"
                name="cvv"
                placeholder="123"
                value={paymentData.cvv}
                onChange={handlePaymentChange}
                error={!!errors.cvv}
                helperText={errors.cvv}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                    color="primary"
                  />
                }
                label="Billing address same as shipping address"
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please review your order details before placing your order.
            </Alert>

            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Order Items
                  </Typography>
                  {items.map((item) => (
                    <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img
                          src={item.images?.[0]?.url || '/images/placeholder-product.jpg'}
                          alt={item.name}
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                        />
                        <Box>
                          <Typography variant="body1">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Qty: {item.quantity}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Paper>

                <Paper sx={{ p: 3, mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Shipping Details
                  </Typography>
                  <Typography variant="body1">
                    {shippingData.firstName} {shippingData.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {shippingData.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {shippingData.country}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Summary
                    </Typography>
                    
                    <Box sx={{ my: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Subtotal</Typography>
                        <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Shipping</Typography>
                        <Typography variant="body2">
                          {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Tax</Typography>
                        <Typography variant="body2">${tax.toFixed(2)}</Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                      <Typography variant="h6">Total</Typography>
                      <Typography variant="h6" color="primary">
                        ${total.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 4 }}>
        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0 || isProcessing}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 
             activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout;