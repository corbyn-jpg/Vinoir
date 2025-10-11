const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    default: ''
  }
}, { _id: false });

const fragranceNotesSchema = new mongoose.Schema({
  topNotes: [String],
  middleNotes: [String],
  baseNotes: [String]
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne', 'Perfume Oil']
  },
  fragranceNotes: fragranceNotesSchema,
  size: {
    type: String,
    required: true,
    enum: ['30ml', '50ml', '100ml']
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  images: [imageSchema],
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  salesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
productSchema.index({ category: 1, price: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ name: 'text', description: 'text' });

// Virtual for whether product is in stock
productSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

module.exports = mongoose.model('Product', productSchema);