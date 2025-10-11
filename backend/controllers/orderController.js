const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

class OrderController {
  // @desc    Create new order
  // @route   POST /api/orders
  // @access  Private
  createOrder = asyncHandler(async (req, res) => {
    const {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      tax,
      totalAmount,
      notes
    } = req.body;

    // Validate items and stock
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new AppError(`Product not found: ${item.product}`, 404);
      }
      if (product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for ${product.name}`, 400);
      }
    }

    // Generate order number
    const orderNumber = `VNO${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();

    // Create order
    const order = await Order.create({
      user: req.user.id,
      orderNumber,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingFee,
      tax,
      totalAmount,
      notes
    });

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity, salesCount: item.quantity } }
      );
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('items.product')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      data: populatedOrder
    });
  });

  // @desc    Get user orders
  // @route   GET /api/orders/user
  // @access  Private
  getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product')
      .sort('-createdAt');

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  });

  // @desc    Get single order
  // @route   GET /api/orders/:id
  // @access  Private
  getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'name email');

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Check if user owns the order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new AppError('Not authorized to access this order', 401);
    }

    res.json({
      success: true,
      data: order
    });
  });

  // @desc    Update order status
  // @route   PUT /api/orders/:id/status
  // @access  Private/Admin
  updateOrderStatus = asyncHandler(async (req, res) => {
    const { status, trackingNumber } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        orderStatus: status,
        ...(trackingNumber && { trackingNumber })
      },
      { new: true, runValidators: true }
    ).populate('items.product');

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    res.json({
      success: true,
      data: order
    });
  });

  // @desc    Get all orders (Admin)
  // @route   GET /api/orders
  // @access  Private/Admin
  getAllOrders = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, status } = req.query;

    const query = {};
    if (status) query.orderStatus = status;

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      success: true,
      count: orders.length,
      total,
      pagination: {
        page: Number(page),
        pages: Math.ceil(total / limit)
      },
      data: orders
    });
  });
}

module.exports = new OrderController();