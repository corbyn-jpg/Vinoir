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
  Divider
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Email, Lock } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import EmojiSelector from '../../components/ui/EmojiSelector';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (emojiPassword.length === 0) {
      newErrors.emojiPassword = 'Emoji password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    const password = emojiPassword.join('');
    const result = await login(formData.email, password);
    
    if (!result.success) {
      setErrors({ submit: result.error });
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@vinoir.com',
      password: ''
    });
    setEmojiPassword(['🌹', '🌟', '🍋', '💎', '🦋']);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to your Vinoir account
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {errors.submit && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.submit}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
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

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Emoji Password
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mt: 4, py: 1.5 }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleDemoLogin}
          sx={{ mb: 3 }}
        >
          Use Demo Account
        </Button>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" underline="hover">
              Sign up here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;