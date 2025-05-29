const jwt = require('jsonwebtoken');
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

const authenticate = async (req, res, next) => {
  try {
    // Try to get token from Authorization header or cookie
    let token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error('Invalid token');
    }

    const db = getDb();
    if (!db) {
      throw new Error('Database connection not established');
    }

    // Check user type and fetch from appropriate collection
    let user;
    const collections = {
      business: 'businesses',
      customer: 'customers',
      admin: 'admins'
    };

    const collection = collections[decoded.role];
    if (collection) {
      user = await db.collection(collection).findOne({ _id: new ObjectId(decoded.id) });
    }

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Attach user and token to request
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({
      status: 'error',
      message: 'Invalid authentication',
      error: error.message
    });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized access',
        requiredRoles: roles,
        currentRole: req.user.role
      });
    }

    next();
  };
};

module.exports = { authenticate, authorize };