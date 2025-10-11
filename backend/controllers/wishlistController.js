const User = require('../models/User');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

class WishlistController {
  // @desc    Get user wishlist
  // @route   GET /api/wishlist
  // @access  Private
  getWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate('wishlist');

    res.json({
      success: true,
      count: user.wishlist.length,
      data: user.wishlist
    });
  });

  // @desc    Add product to wishlist
  // @route   POST /api/wishlist
  // @access  Private
  addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
      throw new AppError('Product ID is required', 400);
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const user = await User.findById(req.user.id);

    // Check if product already in wishlist
    if (user.wishlist.includes(productId)) {
      throw new AppError('Product already in wishlist', 400);
    }

    // Add to wishlist
    user.wishlist.push(productId);
    await user.save();

    await user.populate('wishlist');

    res.json({
      success: true,
      message: 'Product added to wishlist',
      data: user.wishlist
    });
  });

  // @desc    Remove product from wishlist
  // @route   DELETE /api/wishlist/:productId
  // @access  Private
  removeFromWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const user = await User.findById(req.user.id);

    // Remove from wishlist
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    await user.populate('wishlist');

    res.json({
      success: true,
      message: 'Product removed from wishlist',
      data: user.wishlist
    });
  });

  // @desc    Clear wishlist
  // @route   DELETE /api/wishlist
  // @access  Private
  clearWishlist = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    user.wishlist = [];
    await user.save();

    res.json({
      success: true,
      message: 'Wishlist cleared',
      data: []
    });
  });
}

module.exports = new WishlistController();