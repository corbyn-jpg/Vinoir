import { VALIDATION_RULES } from './constants';

// Email validation
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!VALIDATION_RULES.EMAIL.test(email)) return 'Please enter a valid email address';
  return '';
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

// Name validation
export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 50) return 'Name must be less than 50 characters';
  return '';
};

// Phone validation
export const validatePhone = (phone) => {
  if (phone && !VALIDATION_RULES.PHONE.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return '';
};

// Address validation
export const validateAddress = (address) => {
  if (!address) return 'Address is required';
  if (address.length < 5) return 'Please enter a complete address';
  return '';
};

// City validation
export const validateCity = (city) => {
  if (!city) return 'City is required';
  return '';
};

// ZIP code validation
export const validateZipCode = (zipCode) => {
  if (!zipCode) return 'ZIP code is required';
  if (!VALIDATION_RULES.ZIP_CODE.test(zipCode)) return 'Please enter a valid ZIP code';
  return '';
};

// Credit card validation
export const validateCardNumber = (cardNumber) => {
  if (!cardNumber) return 'Card number is required';
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!VALIDATION_RULES.CARD_NUMBER.test(cleaned)) return 'Please enter a valid card number';
  return '';
};

// CVV validation
export const validateCVV = (cvv) => {
  if (!cvv) return 'CVV is required';
  if (!VALIDATION_RULES.CVV.test(cvv)) return 'Please enter a valid CVV';
  return '';
};

// Expiry date validation
export const validateExpiryDate = (expiryDate) => {
  if (!expiryDate) return 'Expiry date is required';
  
  const [month, year] = expiryDate.split('/');
  if (!month || !year || month.length !== 2 || year.length !== 2) {
    return 'Please enter a valid expiry date (MM/YY)';
  }
  
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  
  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);
  
  if (expMonth < 1 || expMonth > 12) return 'Invalid month';
  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return 'Card has expired';
  }
  
  return '';
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach(field => {
    const value = formData[field];
    const validationFn = validationRules[field];
    const error = validationFn(value);
    
    if (error) {
      errors[field] = error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};