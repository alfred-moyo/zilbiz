const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Admin routes working' });
});

// Get all admins
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    res.json({ message: 'List of all admins' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
});

// Get admin profile
router.get('/profile', authenticate, authorize(['admin']), async (req, res) => {
  try {
    res.json({ message: 'Admin profile', user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Create new admin
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    res.status(201).json({ message: 'Admin created', data: req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error: error.message });
  }
});

// Update admin
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    res.json({ message: `Admin updated for ID: ${req.params.id}`, data: req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin', error: error.message });
  }
});

// Delete admin
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    res.json({ message: `Admin deleted for ID: ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin', error: error.message });
  }
});

module.exports = router;