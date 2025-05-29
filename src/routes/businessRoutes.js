const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Business routes working' });
});

// Get all businesses
router.get('/', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const businesses = await db.collection('businesses').find().toArray();
    res.json({ businesses });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching businesses', error: error.message });
  }
});

// Get single business
router.get('/:id', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const business = await db.collection('businesses').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json({ business });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business', error: error.message });
  }
});

// Create new business
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const db = getDb();
    const newBusiness = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('businesses').insertOne(newBusiness);
    res.status(201).json({ message: 'Business created', data: result.ops[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error creating business', error: error.message });
  }
});

// Update business
router.put('/:id', authenticate, authorize(['admin', 'business']), async (req, res) => {
  try {
    const db = getDb();
    const business = await db.collection('businesses').findOne({ _id: new ObjectId(req.params.id) });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Check if the user is the business owner (for business role)
    if (req.user.role === 'business' && req.user.id !== business.ownerId.toString()) {
      return res.status(403).json({ message: 'You can only update your own business' });
    }

    const updatedBusiness = {
      ...business,
      ...req.body,
      updatedAt: new Date(),
    };

    const result = await db.collection('businesses').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedBusiness }
    );

    res.json({ message: 'Business updated', data: updatedBusiness });
  } catch (error) {
    res.status(500).json({ message: 'Error updating business', error: error.message });
  }
});

// Delete business
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const db = getDb();
    const business = await db.collection('businesses').findOne({ _id: new ObjectId(req.params.id) });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    await db.collection('businesses').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: 'Business deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting business', error: error.message });
  }
});

module.exports = router;
