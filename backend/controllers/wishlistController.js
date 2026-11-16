const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Add to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  const { listingId } = req.body;

  try {
    const wishlist = await prisma.wishlist.create({
      data: {
        userId: req.user.id,
        listingId: parseInt(listingId),
      },
    });

    res.status(201).json(wishlist);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Already in wishlist' });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist/:id
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await prisma.wishlist.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (wishlist && wishlist.userId === req.user.id) {
      await prisma.wishlist.delete({
        where: { id: parseInt(req.params.id) }
      });
      res.json({ message: 'Removed from wishlist' });
    } else {
      res.status(401).json({ message: 'Not authorized or item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getMyWishlist = async (req, res) => {
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: req.user.id },
      include: { listing: true }
    });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getMyWishlist };
