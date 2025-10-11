import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { Sort } from '@mui/icons-material';

const SortSelect = ({ value, onChange, sx = {} }) => {
  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <FormControl sx={{ minWidth: 200, ...sx }} size="small">
      <InputLabel>Sort By</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Sort By"
        startAdornment={
          <Box component={Sort} sx={{ mr: 1, color: 'text.secondary' }} />
        }
      >
        {sortOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortSelect;