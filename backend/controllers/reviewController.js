const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Add a review
// @route   POST /api/reviews
// @access  Private
const addReview = async (req, res) => {
  const { listingId, comment, rating } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        listingId: parseInt(listingId),
        comment,
        rating: parseInt(rating),
      },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reviews for a listing
// @route   GET /api/reviews/:listingId
// @access  Public
const getListingReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { listingId: parseInt(req.params.listingId) },
      include: { user: { select: { name: true, avatar: true } } }
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview, getListingReviews };
