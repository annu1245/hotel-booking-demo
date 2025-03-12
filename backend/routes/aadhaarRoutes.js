// routes/aadhaarRoutes.js
const express = require('express');
const router = express.Router();
const { checkAadhaar, getAadhaars, storeAadhaars } = require('../controllers/aadhaarController');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/check', authMiddleware, checkAadhaar);
router.get('/:hotelBookingId', authMiddleware, getAadhaars);
router.post('/', authMiddleware, storeAadhaars);

module.exports = router;