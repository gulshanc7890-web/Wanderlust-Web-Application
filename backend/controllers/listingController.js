const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
const getListings = async (req, res) => {
  const { category, country, minPrice, maxPrice, search, ownerId } = req.query;

  let query = {
    where: {},
    include: {
      owner: {
        select: { name: true, avatar: true }
      }
    }
  };

  if (category) query.where.category = category;
  if (country) query.where.country = country;
  if (ownerId) query.where.ownerId = parseInt(ownerId);
  if (minPrice || maxPrice) {
    query.where.price = {
      gte: minPrice ? parseFloat(minPrice) : 0,
      lte: maxPrice ? parseFloat(maxPrice) : 9999999,
    };
  }
  if (search) {
    query.where.OR = [
      { title: { contains: search } },
      { location: { contains: search } },
      { country: { contains: search } },
    ];
  }

  try {
    const listings = await prisma.listing.findMany(query);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
const getListingById = async (req, res) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        owner: { select: { name: true, avatar: true, email: true } },
        reviews: {
          include: {
            user: { select: { name: true, avatar: true } }
          }
        }
      }
    });

    if (listing) {
      res.json(listing);
    } else {
      res.status(404).json({ message: 'Listing not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a listing
// @route   POST /api/listings
// @access  Private
const createListing = async (req, res) => {
  const { title, description, price, country, location, image, category, amenities, latitude, longitude } = req.body;

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        country,
        location,
        image,
        category,
        amenities,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        ownerId: req.user.id,
      },
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private
const updateListing = async (req, res) => {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: parseInt(req.params.id) } });

    if (listing && listing.ownerId === req.user.id) {
      const { id, ownerId, ...updateData } = req.body;
      const updatedListing = await prisma.listing.update({
        where: { id: parseInt(req.params.id) },
        data: updateData,
      });
      res.json(updatedListing);
    } else {
      res.status(401).json({ message: 'Not authorized or listing not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private
const deleteListing = async (req, res) => {
  try {
    const listing = await prisma.listing.findUnique({ where: { id: parseInt(req.params.id) } });

    if (listing && (listing.ownerId === req.user.id || req.user.role === 'ADMIN')) {
      await prisma.listing.delete({ where: { id: parseInt(req.params.id) } });
      res.json({ message: 'Listing removed' });
    } else {
      res.status(401).json({ message: 'Not authorized or listing not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getListings, getListingById, createListing, updateListing, deleteListing };
