import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, sm: 10 }, // Adjust padding based on header height
          minHeight: 'calc(100vh - 140px)' // Adjust based on header + footer height
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;