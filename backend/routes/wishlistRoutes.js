const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getMyWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMyWishlist).post(protect, addToWishlist);
router.route('/:id').delete(protect, removeFromWishlist);

module.exports = router;
