const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/stats', protect, admin, async (req, res) => {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  try {
    const [users, listings, bookings] = await Promise.all([
      prisma.user.count(),
      prisma.listing.count(),
      prisma.booking.count(),
    ]);
    const revenue = await prisma.booking.aggregate({
      _sum: { totalPrice: true }
    });
    res.json({ 
      users, 
      listings, 
      bookings, 
      revenue: revenue._sum.totalPrice || 0 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
