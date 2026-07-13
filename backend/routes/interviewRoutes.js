const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Protected interviews route accessed successfully',
    user: req.user,
  });
});

router.post('/start', authenticateToken, (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ success: false, message: 'Topic is required' });
  }

  res.status(201).json({
    success: true,
    message: 'Interview session started',
    data: { topic, userId: req.user.id },
  });
});

module.exports = router;
