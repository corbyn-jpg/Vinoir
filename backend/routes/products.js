const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(productController.getProducts)
  .post(protect, authorize('admin'), productController.createProduct);

router
  .route('/featured')
  .get(productController.getFeaturedProducts);

router
  .route('/:id')
  .get(productController.getProduct)
  .put(protect, authorize('admin'), productController.updateProduct)
  .delete(protect, authorize('admin'), productController.deleteProduct);

module.exports = router;