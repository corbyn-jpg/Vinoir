const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(protect, wishlistController.getWishlist)
  .post(protect, wishlistController.addToWishlist)
  .delete(protect, wishlistController.clearWishlist);

router
  .route('/:productId')
  .delete(protect, wishlistController.removeFromWishlist);

module.exports = router;