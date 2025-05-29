const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');

const registerCustomer = async (req, res) => {
  console.log('Received registration request:', req.body);
  try {
    const { name, email, password, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields (name, email, password)'
      });
    }

    const db = getDb();
    
    // Check if customer already exists
    const existingCustomer = await db.collection('customers').findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({
        status: 'error',
        message: 'Customer with this email already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create customer document
    const customer = {
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      role: 'customer',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    };

    // Insert into database
    const result = await db.collection('customers').insertOne(customer);

    // Create JWT token
    const token = jwt.sign(
      { 
        id: result.insertedId.toString(),
        role: 'customer'
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
    res.status(201).json({
      status: 'success',
      message: 'Customer registered successfully',
      data: {
        customer: {
          id: result.insertedId,
          name: customer.name,
          email: customer.email,
          role: customer.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Customer registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error registering customer',
      error: error.message
    });
  }
};

const loginCustomer = async (req, res) => {
  console.log('Received login request:', req.body);
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

    // Find customer
    const customer = await db.collection('customers').findOne({ email });
    if (!customer) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Create token
    const token = jwt.sign(
      { 
        id: customer._id.toString(),
        role: 'customer'
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
        customer: {
          id: customer._id,
          name: customer.name,
          email: customer.email,
          role: customer.role
        },
        token
      }
    });

  } catch (error) {
    console.error('Customer login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error during login',
      error: error.message
    });
  }
};

module.exports = { registerCustomer, loginCustomer };