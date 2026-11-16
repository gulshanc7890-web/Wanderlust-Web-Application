const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { listingId, checkIn, checkOut, guests } = req.body;

  try {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Ensure UTC midnight for reliable date comparison
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return res.status(400).json({ message: 'Check-in date cannot be in the past' });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    // Check availability (no overlapping confirmed bookings)
    const existingBooking = await prisma.booking.findFirst({
      where: {
        listingId: parseInt(listingId),
        bookingStatus: 'confirmed',
        checkIn: { lt: checkOutDate },
        checkOut: { gt: checkInDate }
      }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Property is not available for these dates' });
    }

    // Calculate price
    const listing = await prisma.listing.findUnique({ where: { id: parseInt(listingId) } });
    if (!listing) {
       return res.status(404).json({ message: 'Listing not found' });
    }
    
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    const days = Math.round(diffTime / (1000 * 60 * 60 * 24));
    const cleaningFee = 500;
    const calculatedPrice = (days * listing.price) + cleaningFee;

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        listingId: parseInt(listingId),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: parseInt(guests),
        totalPrice: calculatedPrice,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed'
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { listing: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({ where: { id: parseInt(req.params.id) } });

    if (booking && booking.userId === req.user.id) {
      await prisma.booking.update({ 
        where: { id: parseInt(req.params.id) },
        data: { bookingStatus: 'cancelled' }
      });
      res.json({ message: 'Booking cancelled successfully' });
    } else {
      res.status(401).json({ message: 'Not authorized or booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, cancelBooking };
