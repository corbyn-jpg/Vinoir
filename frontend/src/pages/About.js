import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper
} from '@mui/material';
import {
  LocalFlorist,    // Replacement for Eco
  WineBar,
  LocalShipping,
  Groups
} from '@mui/icons-material';

const About = () => {
  const features = [
    {
      icon: <WineBar sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Curated Selection',
      description: 'Hand-picked wines from boutique vineyards and renowned estates around the world.'
    },
    {
      icon: <LocalFlorist sx={{ fontSize: 40, color: 'primary.main' }} />,  // Replaced Eco with LocalFlorist
      title: 'Sustainable Sourcing',
      description: 'We partner with wineries committed to organic and sustainable farming practices.'
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Direct Delivery',
      description: 'Fresh from the vineyard to your doorstep with careful temperature control.'
    },
    {
      icon: <Groups sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Expert Community',
      description: 'Connect with sommeliers and wine enthusiasts to expand your knowledge.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ 
          fontFamily: 'Playfair Display',
          fontWeight: 700,
          color: 'primary.main'
        }}>
          About Vinoir
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Discover the art of fine wine through our carefully curated collection, 
          where every bottle tells a story and every sip creates a memory.
        </Typography>
      </Box>

      {/* Mission Statement */}
      <Paper elevation={0} sx={{ 
        p: 6, 
        mb: 8, 
        backgroundColor: 'background.default',
        borderRadius: 2
      }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Our Mission
        </Typography>
        <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: 'auto' }}>
          At Vinoir, we believe that great wine should be accessible to everyone. 
          We bridge the gap between passionate winemakers and discerning consumers, 
          bringing you exceptional wines that reflect their terroir, tradition, and craftsmanship.
        </Typography>
      </Paper>

      {/* Features Grid */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card elevation={2} sx={{ height: '100%', p: 3 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Story Section */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          Founded in 2020, Vinoir began as a passion project between friends who shared 
          a love for exceptional wines and the stories behind them. What started as 
          weekend wine tastings evolved into a mission to share these discoveries 
          with fellow enthusiasts around the world.
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto' }}>
          Today, we work directly with over 50 family-owned vineyards across France, 
          Italy, Spain, and California, bringing you unique wines that you won't find 
          in typical stores.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;