const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, profile } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash, profile: profile || {} });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '30d' });
    return res.json({ token, user: { id: user._id, email: user.email, profile: user.profile } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '30d' });
    return res.json({ token, user: { id: user._id, email: user.email, profile: user.profile } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
