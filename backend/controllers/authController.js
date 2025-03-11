const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require('../helpers/auth');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with hashed password
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const token = generateToken(user);

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong, please try again later." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong, please try again later." });
  }
};