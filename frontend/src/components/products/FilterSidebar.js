import React from 'react';
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
  Button
} from '@mui/material';
import { Clear } from '@mui/icons-material';

const FilterSidebar = ({
  categories = [],
  selectedCategories = [],
  onCategoryChange,
  priceRange = [0, 1000],
  onPriceRangeChange,
  maxPrice = 1000,
  onClearFilters
}) => {
  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handlePriceChange = (event, newValue) => {
    onPriceRangeChange(newValue);
  };

  const activeFilterCount = selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0);

  return (
    <Box sx={{ width: 280, p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        {activeFilterCount > 0 && (
          <Button
            size="small"
            startIcon={<Clear />}
            onClick={onClearFilters}
            sx={{ minWidth: 'auto' }}
          >
            Clear
          </Button>
        )}
      </Box>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Active filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selectedCategories.map(category => (
              <Chip
                key={category}
                label={category}
                size="small"
                onDelete={() => handleCategoryToggle(category)}
              />
            ))}
            {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <Chip
                label={`$${priceRange[0]} - $${priceRange[1]}`}
                size="small"
                onDelete={() => onPriceRangeChange([0, maxPrice])}
              />
            )}
          </Box>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Price Range Filter */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `$${value}`}
          min={0}
          max={maxPrice}
          sx={{ mt: 3 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            ${priceRange[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${priceRange[1]}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Category Filter */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Categories
        </Typography>
        <FormGroup>
          {categories.map(category => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  size="small"
                />
              }
              label={category}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
};

export default FilterSidebar;