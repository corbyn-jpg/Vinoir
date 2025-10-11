const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), orderController.getAllOrders)
  .post(protect, orderController.createOrder);

router
  .route('/user')
  .get(protect, orderController.getUserOrders);

router
  .route('/:id')
  .get(protect, orderController.getOrder);

router
  .route('/:id/status')
  .put(protect, authorize('admin'), orderController.updateOrderStatus);

module.exports = router;