const express = require('express');
const multer = require('multer');
const { authenticateToken } = require('../middleware/authMiddleware');
const ResumeAnalysis = require('../models/ResumeAnalysis');
const { analyzeResumeDocument } = require('../services/aiService');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF and DOCX files are supported'));
  },
});

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const items = await ResumeAnalysis.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
});

router.post('/analyze', authenticateToken, upload.single('resume'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume file is required (PDF or DOCX)' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        success: false,
        message: 'AI service is not configured. Set GEMINI_API_KEY in backend .env',
      });
    }

    const targetRole = req.body.targetRole || '';
    const analysis = await analyzeResumeDocument(
      req.file.buffer,
      req.file.mimetype,
      req.file.originalname,
      targetRole
    );

    const saved = await ResumeAnalysis.create({
      user: req.user.id,
      fileName: req.file.originalname,
      targetRole,
      ...analysis,
    });

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
