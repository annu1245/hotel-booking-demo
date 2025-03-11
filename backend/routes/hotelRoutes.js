const express = require('express');
const router = express.Router();
const { getAllHotels, createHotel } = require('../controllers/hotelController');
const authMiddleware = require('../middleware/authMiddleware.js');

router.get('/', getAllHotels);
router.post('/', authMiddleware, createHotel);

module.exports = router;