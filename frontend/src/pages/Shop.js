import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Pagination,
  Card,
  CardContent,
  Skeleton,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { Search, FilterList, Clear, ViewModule, ViewList } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ui/ProductCard';
import { productAPI } from '../services/api';

const ITEMS_PER_PAGE = 12;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);

  // Available filters from products
  const categories = useMemo(() => {
    if (!Array.isArray(products)) return [];
    const validCategories = products
      .map(p => p?.category)
      .filter(category => category && typeof category === 'string');
    return [...new Set(validCategories)];
  }, [products]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productAPI.getAll();
        
        // Validate that data is an array
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server');
        }
        
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to load products');
        setProducts([]); // Ensure products is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => {
        if (!product || typeof product !== 'object') return false;
        
        const searchLower = searchTerm.toLowerCase();
        return (
          (product.name && product.name.toLowerCase().includes(searchLower)) ||
          (product.description && product.description.toLowerCase().includes(searchLower)) ||
          (product.brand && product.brand.toLowerCase().includes(searchLower)) ||
          (product.fragranceNotes?.topNotes?.some(note => 
            note && note.toLowerCase().includes(searchLower)
          )) ||
          (product.fragranceNotes?.middleNotes?.some(note => 
            note && note.toLowerCase().includes(searchLower)
          )) ||
          (product.fragranceNotes?.baseNotes?.some(note => 
            note && note.toLowerCase().includes(searchLower)
          ))
        );
      });
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        product?.category && selectedCategories.includes(product.category)
      );
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const price = Number(product?.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategories, priceRange, sortBy]);

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  }, [searchTerm, searchParams, setSearchParams]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    if (!Array.isArray(filteredProducts)) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil((Array.isArray(filteredProducts) ? filteredProducts.length : 0) / ITEMS_PER_PAGE);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setSortBy('name');
  };

  const activeFilterCount = [
    searchTerm,
    selectedCategories.length > 0,
    priceRange[0] > 0 || priceRange[1] < 5000
  ].filter(Boolean).length;

  const renderSkeletons = () => (
    <Grid container spacing={3}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={20} />
              <Skeleton variant="text" height={20} width="60%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderProductGrid = () => {
    if (!Array.isArray(paginatedProducts) || paginatedProducts.length === 0) {
      return (
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" gutterBottom color="text.secondary">
              No products found
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {searchTerm || selectedCategories.length > 0 
                ? "Try adjusting your search or filters"
                : "No products available at the moment"
              }
            </Typography>
            {(searchTerm || selectedCategories.length > 0) && (
              <Button variant="contained" onClick={handleClearFilters}>
                Clear All Filters
              </Button>
            )}
          </Box>
        </Grid>
      );
    }

    return paginatedProducts.map((product) => (
      <Grid 
        item 
        xs={12} 
        sm={viewMode === 'list' ? 12 : 6} 
        md={viewMode === 'list' ? 12 : 4} 
        lg={viewMode === 'list' ? 12 : 3} 
        key={product?._id || Math.random()}
      >
        <ProductCard product={product} viewMode={viewMode} />
      </Grid>
    ));
  };

  if (error) {
    return (
      <Box>
        <HeroSection
          title="Luxury Fragrances"
          subtitle="Discover our exquisite collection of premium scents for every occasion"
          backgroundImage="/images/heroes/hero-1.jpg"
          overlayOpacity={0.5}
        />
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Unable to load products
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please check your connection and try again
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection
        title="Luxury Fragrances"
        subtitle="Discover our exquisite collection of premium scents for every occasion"
        backgroundImage="/images/heroes/hero-1.jpg"
        overlayOpacity={0.5}
      />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Search and Filter Bar */}
        <Card sx={{ mb: 3, p: 2 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search fragrances by name, notes, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    multiple
                    value={selectedCategories}
                    onChange={(e) => setSelectedCategories(e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                    disabled={categories.length === 0}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="name">Name A-Z</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="newest">Newest First</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                  <Button
                    variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('grid')}
                    startIcon={<ViewModule />}
                    size="small"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'contained' : 'outlined'}
                    onClick={() => setViewMode('list')}
                    startIcon={<ViewList />}
                    size="small"
                  >
                    List
                  </Button>
                  {activeFilterCount > 0 && (
                    <Chip
                      label={`${activeFilterCount} active`}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  <Button
                    startIcon={<Clear />}
                    onClick={handleClearFilters}
                    variant="outlined"
                    size="small"
                    disabled={activeFilterCount === 0}
                  >
                    Clear
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body1" color="text.secondary">
            {loading ? (
              'Loading products...'
            ) : (
              `Showing ${paginatedProducts.length} of ${filteredProducts.length} products`
            )}
          </Typography>
          
          {loading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Loading...
              </Typography>
            </Box>
          )}
          
          {!loading && <FilterList color="action" />}
        </Box>

        {/* Products Grid */}
        {loading ? (
          renderSkeletons()
        ) : (
          <>
            <Grid container spacing={3}>
              {renderProductGrid()}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Shop;