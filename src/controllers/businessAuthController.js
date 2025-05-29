const bcrypt = require('bcryptjs');
const Business = require('../models/business');
const { getDb } = require('../config/db');

const registerBusiness = async (req, res) => {
  try {
    const db = getDb();
    const businessModel = new Business(db);
    
    const { name, email, password, businessType } = req.body;
    
    const existingBusiness = await businessModel.findBusinessByEmail(email);
    if (existingBusiness) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newBusiness = {
      name,
      email,
      password: hashedPassword,
      businessType,
      role: 'business',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await businessModel.createBusiness(newBusiness);
    
    res.status(201).json({ message: 'Business registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginBusiness = async (req, res) => {
  try {
    const db = getDb();
    const businessModel = new Business(db);
    
    const { email, password } = req.body;
    const business = await businessModel.findBusinessByEmail(email);
    
    if (!business) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // In a real app, generate JWT token here
    res.json({ 
      message: 'Business login successful',
      user: {
        id: business._id,
        name: business.name,
        email: business.email,
        role: 'business'
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllBusinesses = async (req, res) => {
    try {
      const db = getDb();
      const businessModel = new Business(db);
      
      const businesses = await businessModel.getAllBusinesses();
      
      // Round average ratings
      const businessesWithRoundedRatings = businesses.map(business => ({
        ...business,
        averageRating: business.averageRating ? Math.round(business.averageRating) : 0
      }));
      
      res.json(businessesWithRoundedRatings);
    } catch (error) {
      console.error('Error in getAllBusinesses:', error);
      res.status(500).json({ error: 'Failed to fetch businesses' });
    }
  };
  

module.exports = { registerBusiness, loginBusiness, getAllBusinesses };