const Admin = require('../models/admin');
const { getDb } = require('../config/db');

// Initialize admin model
const db = getDb();
const adminModel = new Admin(db);

const adminController = {
  /**
   * Create initial admin (run once during setup)
   */
  async initializeAdmin() {
    const { success, error } = await adminModel.createAdmin({
      email: process.env.ADMIN_INIT_EMAIL || 'admin@zilbiz.com',
      password: process.env.ADMIN_INIT_PASSWORD || 'securePassword123',
      name: 'System Administrator'
    });
    
    if (!success) {
      console.error('Admin initialization failed:', error);
    }
  },

  /**
   * Handle admin login
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Verify credentials
      const verification = await adminModel.verifyAdmin(email, password);
      if (!verification.success) {
        return res.status(401).json({ error: verification.error });
      }

      // Generate JWT token (add your JWT implementation)
      const token = generateJWTToken(verification.data);
      
      res.json({
        message: 'Login successful',
        token,
        admin: verification.data
      });

    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * Get all admins (protected route)
   */
  async getAllAdmins(req, res) {
    try {
      const admins = await adminModel.getAllAdmins();
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch admins' });
    }
  }
};

// Helper function (add to your auth utilities)
function generateJWTToken(admin) {
  // Your JWT implementation here
  return jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

module.exports = adminController;