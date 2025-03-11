const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/', authMiddleware, createBooking);
router.get('/hotels', authMiddleware, getBookings);

module.exports = router;