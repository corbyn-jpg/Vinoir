import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  InputAdornment
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  WineBar as WineIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock search data - replace with actual API call
const mockProducts = [
  { id: 1, name: 'Cabernet Sauvignon', type: 'Red Wine', price: 29.99 },
  { id: 2, name: 'Chardonnay', type: 'White Wine', price: 24.99 },
  { id: 3, name: 'Pinot Noir', type: 'Red Wine', price: 32.99 },
  { id: 4, name: 'Sauvignon Blanc', type: 'White Wine', price: 22.99 },
  { id: 5, name: 'Merlot', type: 'Red Wine', price: 27.99 },
];

const SearchDrawer = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchTerm]);

  const handleProductClick = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
    setSearchTerm('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          height: '100vh',
          pt: 8
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Search Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Search Products
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit}>
          <TextField
            fullWidth
            autoFocus
            placeholder="Search for wines, types, regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            sx={{ mb: 3 }}
          />
        </form>

        <Divider />

        {/* Search Results */}
        {searchTerm && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {searchResults.length > 0 
                ? `Found ${searchResults.length} results` 
                : 'No products found'}
            </Typography>

            <List>
              {searchResults.map((product) => (
                <ListItem
                  key={product.id}
                  button
                  onClick={() => handleProductClick(product.id)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <ListItemIcon>
                    <WineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={product.name}
                    secondary={`${product.type} - $${product.price}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Popular Searches */}
        {!searchTerm && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Popular Searches
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['Red Wine', 'White Wine', 'Sparkling', 'Rose', 'Dessert Wine'].map((term) => (
                <Box
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  sx={{
                    px: 2,
                    py: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <Typography variant="body2">{term}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default SearchDrawer;