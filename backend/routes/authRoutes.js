const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validateRegistration, validateLogin } = require('../middleware/validation');

const router = express.Router();

const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key';
const users = [];

router.post('/register', validateRegistration, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), name, email, password: hashedPassword };
    users.push(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.status(201).json({ success: true, token, user: { id: newUser.id, name, email } });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = users.find((entry) => entry.email === email);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
});

router.get('/me', require('../middleware/authMiddleware').authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = router;
