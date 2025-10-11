const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.param,
      message: error.msg
    }));
    
    return next(new AppError('Validation failed', 400, errorMessages));
  }
  
  next();
};

// Sanitization middleware
const sanitizeInput = (req, res, next) => {
  // Sanitize string fields
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key].trim();
        
        // Prevent NoSQL injection
        if (req.body[key].includes('$') || req.body[key].includes('{')) {
          req.body[key] = req.body[key].replace(/[${}]/g, '');
        }
      }
    });
  }
  
  next();
};

module.exports = {
  handleValidationErrors,
  sanitizeInput
};