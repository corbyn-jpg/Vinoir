const AppError = require('../utils/AppError');

// Development error response
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

// Production error response
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details && { details: err.details })
    });
  } 
  // Programming or other unknown error: don't leak error details
  else {
    console.error('ERROR 💥', err);
    
    res.status(500).json({
      success: false,
      message: 'Something went wrong!'
    });
  }
};

// Global error handler middleware
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = 'Resource not found';
      error = new AppError(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `${field} already exists`;
      error = new AppError(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      const message = `Invalid input data: ${messages.join('. ')}`;
      error = new AppError(message, 400);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      const message = 'Invalid token';
      error = new AppError(message, 401);
    }

    if (err.name === 'TokenExpiredError') {
      const message = 'Token expired';
      error = new AppError(message, 401);
    }

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;