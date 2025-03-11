// routes/aadhaarRoutes.js
const express = require('express');
const router = express.Router();
const aadhaarController = require('../controllers/aadhaarController');

router.post('/check', aadhaarController.checkAadhaar);

module.exports = router;