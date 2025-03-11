const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const { login, register } = require('../controllers/authController.js');

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;