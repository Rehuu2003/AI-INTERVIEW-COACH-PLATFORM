const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/authMiddleware');
const Interview = require('../models/Interview');
const User = require('../models/User');
const { getNextInterviewMessage, analyzeInterview } = require('../services/aiService');

const router = express.Router();

// ─── List all interviews for current user ─────────────────────────────────
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, topic } = req.query;
    const filter = { user: req.user.id };

    if (status) filter.status = status;
    if (topic) filter.topic = { $regex: topic, $options: 'i' };

    const interviews = await Interview.find(filter)
      .select('-messages') // exclude full transcript from list view
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Interview.countDocuments(filter);

    res.json({
      success: true,
      data: interviews,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
});

// ─── Start a new interview session ────────────────────────────────────────
router.post(
  '/start',
  authenticateToken,
  [
    body('topic').trim().notEmpty().withMessage('Topic is required'),
    body('difficulty').optional().isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty'),
    body('type')
      .optional()
      .isIn(['technical', 'behavioral', 'system-design', 'mixed'])
      .withMessage('Invalid interview type'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { topic, difficulty = 'medium', type = 'mixed' } = req.body;

      // Get opening message from AI
      const openingMessage = await getNextInterviewMessage([], topic, difficulty, type);

      const interview = await Interview.create({
        user: req.user.id,
        topic,
        difficulty,
        type,
        status: 'in-progress',
        messages: [{ role: 'assistant', content: openingMessage }],
        questionCount: 1,
      });

      res.status(201).json({
        success: true,
        data: {
          interviewId: interview._id,
          message: openingMessage,
          topic,
          difficulty,
          type,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// ─── Get single interview (with full transcript) ───────────────────────────
router.get(
  '/:id',
  authenticateToken,
  [param('id').isMongoId().withMessage('Invalid interview ID')],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const interview = await Interview.findOne({ _id: req.params.id, user: req.user.id });
      if (!interview) {
        return res.status(404).json({ success: false, message: 'Interview not found' });
      }

      res.json({ success: true, data: interview });
    } catch (err) {
      next(err);
    }
  }
);

// ─── Send a message (continue conversation) ───────────────────────────────
router.post(
  '/:id/message',
  authenticateToken,
  [
    param('id').isMongoId().withMessage('Invalid interview ID'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const interview = await Interview.findOne({ _id: req.params.id, user: req.user.id });
      if (!interview) {
        return res.status(404).json({ success: false, message: 'Interview not found' });
      }

      if (interview.status !== 'in-progress') {
        return res.status(400).json({ success: false, message: 'This interview session has ended' });
      }

      // Append user message
      interview.messages.push({ role: 'user', content: req.body.message });

      // Get AI follow-up question/response
      const aiReply = await getNextInterviewMessage(
        interview.messages,
        interview.topic,
        interview.difficulty,
        interview.type
      );

      interview.messages.push({ role: 'assistant', content: aiReply });
      interview.questionCount = interview.messages.filter((m) => m.role === 'assistant').length;

      await interview.save();

      res.json({ success: true, data: { message: aiReply, questionCount: interview.questionCount } });
    } catch (err) {
      next(err);
    }
  }
);

// ─── Complete interview & trigger AI analysis ─────────────────────────────
router.post(
  '/:id/complete',
  authenticateToken,
  [param('id').isMongoId().withMessage('Invalid interview ID')],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const interview = await Interview.findOne({ _id: req.params.id, user: req.user.id });
      if (!interview) {
        return res.status(404).json({ success: false, message: 'Interview not found' });
      }

      if (interview.status === 'completed') {
        return res.json({ success: true, data: interview }); // already done, return cached result
      }

      const userMessages = interview.messages.filter((m) => m.role === 'user');
      if (userMessages.length < 2) {
        return res.status(400).json({ success: false, message: 'Not enough responses to analyze' });
      }

      // Run AI analysis
      const analysis = await analyzeInterview(interview.messages, interview.topic, interview.type);

      interview.status = 'completed';
      interview.completedAt = new Date();
      interview.overallScore = analysis.overallScore;
      interview.scoreBreakdown = analysis.scoreBreakdown;
      interview.feedback = analysis.feedback;

      // Calculate duration in seconds
      const start = interview.createdAt;
      interview.duration = Math.round((new Date() - start) / 1000);

      await interview.save();

      // Update user stats
      const user = await User.findById(req.user.id);
      await user.updateStats();

      res.json({ success: true, data: interview });
    } catch (err) {
      next(err);
    }
  }
);

// ─── Abandon an interview ─────────────────────────────────────────────────
router.patch(
  '/:id/abandon',
  authenticateToken,
  [param('id').isMongoId().withMessage('Invalid interview ID')],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const interview = await Interview.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id, status: 'in-progress' },
        { status: 'abandoned' },
        { new: true }
      );

      if (!interview) {
        return res.status(404).json({ success: false, message: 'Active interview not found' });
      }

      res.json({ success: true, message: 'Interview abandoned', data: { id: interview._id } });
    } catch (err) {
      next(err);
    }
  }
);

// ─── Delete an interview ──────────────────────────────────────────────────
router.delete(
  '/:id',
  authenticateToken,
  [param('id').isMongoId().withMessage('Invalid interview ID')],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const interview = await Interview.findOneAndDelete({ _id: req.params.id, user: req.user.id });
      if (!interview) {
        return res.status(404).json({ success: false, message: 'Interview not found' });
      }

      // Recalculate user stats after deletion
      const user = await User.findById(req.user.id);
      await user.updateStats();

      res.json({ success: true, message: 'Interview deleted' });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
