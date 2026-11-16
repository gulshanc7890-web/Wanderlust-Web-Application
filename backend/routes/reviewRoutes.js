const express = require('express');
const router = express.Router();
const { addReview, getListingReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addReview);
router.get('/:listingId', getListingReviews);

module.exports = router;
