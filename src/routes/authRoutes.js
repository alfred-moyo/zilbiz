const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');
const { registerCustomer, loginCustomer } = require('../controllers/customerAuthController');
const { verifyRecaptcha } = require('../middleware/recaptchaMiddleware');

// Test auth routes
router.get('/test', (req, res) => {
  res.json({ message: 'Auth routes working' });
});

// Business Registration
router.post('/register/business', async (req, res) => {
  console.log('Received business registration request:', req.body);
  try {
    const { name, email, password, phone, address } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields (name, email, password)'
      });
    }

    const db = getDb();
    
    // Check if business already exists
    const existingBusiness = await db.collection('businesses').findOne({ email });
    if (existingBusiness) {
      return res.status(400).json({
        status: 'error',
        message: 'Business with this email already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create business document
    const business = {
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: address || '',
      role: 'business',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    };

    // Insert into database
    const result = await db.collection('businesses').insertOne(business);

    // Create JWT token
    const token = jwt.sign(
      { 
        id: result.insertedId.toString(),
        role: 'business'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    console.log('Business registered successfully:', result.insertedId);
    // Send response
    res.status(201).json({
      status: 'success',
      message: 'Business registered successfully',
      data: {
        business: {
          id: result.insertedId,
          name: business.name,
          email: business.email,
          role: business.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Business registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error registering business',
      error: error.message
    });
  }
});

// Business Login
router.post('/login/business', verifyRecaptcha, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    const db = getDb();

    // Find business
    const business = await db.collection('businesses').findOne({ email });
    if (!business) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign(
      { 
        id: business._id.toString(),
        role: 'business'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // Send response
    res.json({
      status: 'success',
      message: 'Logged in successfully',
      data: {
        business: {
          id: business._id,
          name: business.name,
          email: business.email,
          role: business.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Business login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error during login',
      error: error.message
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  
  res.json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

// Customer Registration
router.post('/register/customer', verifyRecaptcha, registerCustomer);

// Customer Login
router.post('/login/customer', verifyRecaptcha, loginCustomer);

module.exports = router;