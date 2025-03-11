// routes/aadhaarRoutes.js
const express = require('express');
const router = express.Router();
const { checkAadhaar } = require('../controllers/aadhaarController');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/check', authMiddleware, checkAadhaar);

module.exports = router;