import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from './Navbar';
import CartDrawer from './Drawers/CartDrawer';
import WishlistDrawer from './Drawers/WishlistDrawer';
import SearchDrawer from './Drawers/SearchDrawer';

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={2}
        sx={{ 
          backgroundColor: 'background.paper',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h4"
            component={RouterLink}
            to="/"
            sx={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              mr: 4
            }}
          >
            Vinoir
          </Typography>

          <Navbar
            onSearchOpen={() => setSearchOpen(true)}
            onCartOpen={() => setCartOpen(true)}
            onWishlistOpen={() => setWishlistOpen(true)}
          />
        </Toolbar>
      </AppBar>

      {/* Drawers */}
      <CartDrawer 
        open={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />
      
      <WishlistDrawer 
        open={wishlistOpen} 
        onClose={() => setWishlistOpen(false)} 
      />
      
      <SearchDrawer 
        open={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
    </>
  );
};

export default Header;