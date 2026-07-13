const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Interview = require('../models/Interview');

const router = express.Router();

// ─── Get profile ──────────────────────────────────────────────────────────
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

// ─── Update profile ───────────────────────────────────────────────────────
router.put(
  '/',
  authenticateToken,
  [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('bio').optional().isLength({ max: 300 }).withMessage('Bio cannot exceed 300 characters'),
    body('targetRole').optional().trim(),
    body('experience')
      .optional()
      .isIn(['entry', 'mid', 'senior', 'lead', ''])
      .withMessage('Invalid experience level'),
    body('skills').optional().isArray().withMessage('Skills must be an array'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const allowedFields = ['name', 'bio', 'targetRole', 'experience', 'skills', 'avatar'];
      const updates = {};
      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) updates[field] = req.body[field];
      });

      const user = await User.findByIdAndUpdate(req.user.id, updates, {
        new: true,
        runValidators: true,
      }).select('-password');

      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  }
);

// ─── Change password ──────────────────────────────────────────────────────
router.put(
  '/password',
  authenticateToken,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const user = await User.findById(req.user.id).select('+password');
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      const isMatch = await user.comparePassword(req.body.currentPassword);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect' });
      }

      user.password = req.body.newPassword;
      await user.save();

      res.json({ success: true, message: 'Password updated successfully' });
    } catch (err) {
      next(err);
    }
  }
);

// ─── Get profile stats (combined view) ────────────────────────────────────
router.get('/stats', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // Recent 5 interviews
    const recentInterviews = await Interview.find({ user: userId, status: 'completed' })
      .select('topic overallScore completedAt type difficulty')
      .sort({ completedAt: -1 })
      .limit(5);

    // Best and worst scores
    const bestInterview = await Interview.findOne({ user: userId, status: 'completed' })
      .sort({ overallScore: -1 })
      .select('topic overallScore completedAt');

    const worstInterview = await Interview.findOne({ user: userId, status: 'completed' })
      .sort({ overallScore: 1 })
      .select('topic overallScore completedAt');

    res.json({
      success: true,
      data: {
        profile: user,
        recentInterviews,
        bestInterview,
        worstInterview,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─── Delete account ───────────────────────────────────────────────────────
router.delete('/', authenticateToken, async (req, res, next) => {
  try {
    await Interview.deleteMany({ user: req.user.id });
    await User.findByIdAndDelete(req.user.id);

    res.json({ success: true, message: 'Account and all data deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
