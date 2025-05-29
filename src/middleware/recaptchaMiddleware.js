const axios = require('axios');

const verifyRecaptcha = async (req, res, next) => {
  console.log('Verifying reCAPTCHA token...');
  try {
    console.log('Request body:', req.body);
    const { recaptchaToken } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({
        status: 'error',
        message: 'reCAPTCHA token is required'
      });
    }

    console.log('reCAPTCHA token:', recaptchaToken);
    console.log('reCAPTCHA secret key:', process.env.RECAPTCHA_SECRET_KEY);

    // Verify the token with Google's reCAPTCHA API
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken
        }
      }
    );

    console.log('reCAPTCHA API response:', response.data);

    if (!response.data.success) {
      return res.status(400).json({
        status: 'error',
        message: 'reCAPTCHA verification failed'
      });
    }

    // If verification successful, proceed to next middleware
    next();
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error verifying reCAPTCHA'
    });
  }
};

module.exports = { verifyRecaptcha };
