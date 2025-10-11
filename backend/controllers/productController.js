const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

class ProductController {
  // @desc    Get all products with filtering, sorting, pagination
  // @route   GET /api/products
  // @access  Public
  getProducts = asyncHandler(async (req, res) => {
    const {
      page = 1,
      limit = 12,
      sort = '-createdAt',
      category,
      minPrice,
      maxPrice,
      search,
      featured
    } = req.query;

    // Build query object
    let query = {};

    // Category filter
    if (category) {
      query.category = { $in: category.split(',') };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'fragranceNotes.topNotes': { $in: [new RegExp(search, 'i')] } },
        { 'fragranceNotes.middleNotes': { $in: [new RegExp(search, 'i')] } },
        { 'fragranceNotes.baseNotes': { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Featured filter
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    // Execute query with pagination
    const products = await Product.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      pagination: {
        page: Number(page),
        pages: Math.ceil(total / limit)
      },
      data: products
    });
  });

  // @desc    Get single product
  // @route   GET /api/products/:id
  // @access  Public
  getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.json({
      success: true,
      data: product
    });
  });

  // @desc    Get featured products
  // @route   GET /api/products/featured
  // @access  Public
  getFeaturedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ featured: true })
      .limit(8)
      .sort('-createdAt')
      .lean();

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  });

  // @desc    Create product
  // @route   POST /api/products
  // @access  Private/Admin
  createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });
  });

  // @desc    Update product
  // @route   PUT /api/products/:id
  // @access  Private/Admin
  updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.json({
      success: true,
      data: product
    });
  });

  // @desc    Delete product
  // @route   DELETE /api/products/:id
  // @access  Private/Admin
  deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  });
}

module.exports = new ProductController();