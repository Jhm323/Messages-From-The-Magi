const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs:         15 * 60 * 1000, // 15 minutes
  max:              100,             // requests per window per IP
  standardHeaders:  true,            // Return rate limit info in RateLimit-* headers
  legacyHeaders:    false,
  message:          { error: 'Too many requests — please try again later.' },
});

module.exports = { rateLimiter };
