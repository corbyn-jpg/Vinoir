import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Card,
  CardContent,
  Alert,
  Divider
} from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

import HeroSection from '../components/HeroSection';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: 'Email Us',
      details: ['support@vinoir.com', 'info@vinoir.com'],
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone sx={{ fontSize: 40 }} />,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: <LocationOn sx={{ fontSize: 40 }} />,
      title: 'Visit Us',
      details: ['123 Fragrance Avenue', 'Paris, FR 75001'],
      description: 'Showroom by appointment'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection
        title="Contact Vinoir"
        subtitle="We'd love to hear from you. Get in touch with our luxury fragrance specialists."
        backgroundImage="/images/heroes/hero-1.jpg"
        overlayOpacity={0.5}
      />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                Contact Information
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Fill out the form and our team will get back to you within 24 hours.
              </Typography>
            </Box>

            {contactMethods.map((method, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ color: 'primary.main' }}>
                    {method.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {method.title}
                    </Typography>
                    {method.details.map((detail, idx) => (
                      <Typography key={idx} variant="body2" color="text.secondary">
                        {detail}
                      </Typography>
                    ))}
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                      {method.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                Send us a Message
              </Typography>

              {submitStatus === 'success' && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Thank you for your message! We'll get back to you soon.
                </Alert>
              )}

              {submitStatus === 'error' && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  There was an error sending your message. Please try again.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      disabled={isSubmitting}
                      sx={{ minWidth: 200 }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>

            {/* FAQ Section */}
            <Paper sx={{ p: 4, mt: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                Frequently Asked Questions
              </Typography>
              <Grid container spacing={3}>
                {[
                  {
                    question: "What is your return policy?",
                    answer: "We offer a 30-day return policy for all unused products in original packaging."
                  },
                  {
                    question: "Do you offer international shipping?",
                    answer: "Yes, we ship worldwide. Shipping costs and delivery times vary by location."
                  },
                  {
                    question: "How do I track my order?",
                    answer: "You'll receive a tracking number via email once your order ships."
                  },
                  {
                    question: "Are your products cruelty-free?",
                    answer: "Yes, all our products are cruelty-free and never tested on animals."
                  }
                ].map((faq, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {faq.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;