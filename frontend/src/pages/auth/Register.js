import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Person, Email, Lock } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import EmojiSelector from '../../components/ui/EmojiSelector';

const steps = ['Account Details', 'Emoji Password', 'Complete'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: ''
  });
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { register, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.confirmEmail) {
      newErrors.confirmEmail = 'Please confirm your email';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (emojiPassword.length < 3) {
      newErrors.emojiPassword = 'Please select at least 3 emojis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0 && validateStep1()) {
      setActiveStep(1);
    } else if (activeStep === 1 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    const userData = {
      name: formData.name.trim(),
      email: formData.email,
      password: emojiPassword.join('')
    };
    
    const result = await register(userData);
    
    if (result.success) {
      setActiveStep(2);
    } else {
      setErrors({ submit: result.error });
    }
    
    setIsLoading(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
              InputProps={{
                startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
            <TextField
              fullWidth
              label="Confirm Email"
              name="confirmEmail"
              type="email"
              value={formData.confirmEmail}
              onChange={handleChange}
              error={!!errors.confirmEmail}
              helperText={errors.confirmEmail}
              margin="normal"
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Create your unique emoji password. You'll use this combination to sign in.
            </Typography>
            <EmojiSelector
              selectedEmojis={emojiPassword}
              setSelectedEmojis={setEmojiPassword}
              maxLength={5}
            />
            {errors.emojiPassword && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.emojiPassword}
              </Typography>
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" color="success.main" gutterBottom>
              🎉 Welcome to Vinoir!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your account has been created successfully. You can now explore our luxury fragrance collection.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/shop')}
            >
              Start Shopping
            </Button>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
            Join Vinoir
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create your account to explore luxury fragrances
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {(error || errors.submit) && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || errors.submit}
          </Alert>
        )}

        {getStepContent(activeStep)}

        {activeStep < 2 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0 || isLoading}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isLoading}
            >
              {activeStep === steps.length - 2 ? 'Create Account' : 'Next'}
            </Button>
          </Box>
        )}

        {activeStep === 0 && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" underline="hover">
                Sign in here
              </Link>
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Register;