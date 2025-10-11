import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const HeroSection = ({ 
  title = '', 
  subtitle = '', 
  backgroundImage = '', 
  height = '400px' 
}) => {
  return (
    <Box
      sx={{
        height: height,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontFamily: 'Playfair Display',
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant="h5" 
              sx={{ 
                maxWidth: '600px',
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;