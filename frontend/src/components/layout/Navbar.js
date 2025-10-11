import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

// Import the hooks - adjust the path based on your project structure
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

const Navbar = ({ onSearchOpen, onCartOpen, onWishlistOpen }) => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  // Safe context usage with fallbacks
  const { isAuthenticated = false, user = null, logout = () => {} } = useAuth?.() || {};
  const { cart = [] } = useCart?.() || {};
  const { wishlistItems = [] } = useWishlist?.() || {};

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  // Safe calculation with fallbacks
  const cartItemsCount = cart.reduce?.((total, item) => total + (item.quantity || 0), 0) || 0;
  const wishlistItemsCount = wishlistItems.length || 0;

  return (
    <>
      <Toolbar>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Navigation Items - Desktop */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 3, ml: 4 }}>
            {navItems.map((item) => (
              <RouterLink
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: location.pathname === item.path ? 
                    theme.palette.primary.main : 'inherit',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  padding: '8px 16px',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease'
                }}
              >
                {item.label}
              </RouterLink>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* Action Icons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="inherit" onClick={onSearchOpen}>
            <SearchIcon />
          </IconButton>

          <IconButton color="inherit" onClick={onWishlistOpen}>
            <Badge badgeContent={wishlistItemsCount} color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={onCartOpen}>
            <Badge badgeContent={cartItemsCount} color="secondary">
              <CartIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit" onClick={handleUserMenuOpen}>
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={handleMobileMenuClose}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
      >
        {isAuthenticated ? (
          [
            <MenuItem
              key="account"
              onClick={handleUserMenuClose}
              component={RouterLink}
              to="/account"
            >
              My Account
            </MenuItem>,
            <MenuItem
              key="orders"
              onClick={handleUserMenuClose}
              component={RouterLink}
              to="/account/orders"
            >
              My Orders
            </MenuItem>,
            <MenuItem
              key="wishlist"
              onClick={handleUserMenuClose}
              component={RouterLink}
              to="/wishlist"
            >
              Wishlist
            </MenuItem>,
            <MenuItem key="divider" divider />,
            <MenuItem key="logout" onClick={handleLogout}>
              Logout
            </MenuItem>
          ]
        ) : (
          [
            <MenuItem
              key="login"
              onClick={handleUserMenuClose}
              component={RouterLink}
              to="/login"
            >
              Login
            </MenuItem>,
            <MenuItem
              key="register"
              onClick={handleUserMenuClose}
              component={RouterLink}
              to="/register"
            >
              Register
            </MenuItem>
          ]
        )}
      </Menu>
    </>
  );
};

export default Navbar;