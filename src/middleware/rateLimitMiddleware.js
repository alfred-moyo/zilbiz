const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    error: 'Too many requests',
    message: 'Please try again after 15 minutes'
  }
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 auth requests per hour
  message: {
    error: 'Too many login attempts',
    message: 'Please try again after an hour'
  }
});

module.exports = { apiLimiter, authLimiter };