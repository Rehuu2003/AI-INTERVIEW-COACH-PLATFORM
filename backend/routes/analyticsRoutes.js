const express = require('express');
const mongoose = require('mongoose');
const { authenticateToken } = require('../middleware/authMiddleware');
const Interview = require('../models/Interview');

const router = express.Router();

// ─── Dashboard summary ────────────────────────────────────────────────────
router.get('/summary', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [total, completed, inProgress, abandoned] = await Promise.all([
      Interview.countDocuments({ user: userId }),
      Interview.countDocuments({ user: userId, status: 'completed' }),
      Interview.countDocuments({ user: userId, status: 'in-progress' }),
      Interview.countDocuments({ user: userId, status: 'abandoned' }),
    ]);

    // Average scores across all completed interviews
    const scoreAgg = await Interview.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(String(userId)), status: 'completed' } },
      {
        $group: {
          _id: null,
          avgOverall: { $avg: '$overallScore' },
          avgTechnical: { $avg: '$scoreBreakdown.technicalKnowledge' },
          avgCommunication: { $avg: '$scoreBreakdown.communication' },
          avgConfidence: { $avg: '$scoreBreakdown.confidence' },
          avgProblemSolving: { $avg: '$scoreBreakdown.problemSolving' },
          avgClarity: { $avg: '$scoreBreakdown.clarity' },
        },
      },
    ]);

    const scores = scoreAgg[0] || {};

    const round = (v) => (v ? Math.round(v) : 0);

    res.json({
      success: true,
      data: {
        counts: { total, completed, inProgress, abandoned },
        averageScores: {
          overall: round(scores.avgOverall),
          technicalKnowledge: round(scores.avgTechnical),
          communication: round(scores.avgCommunication),
          confidence: round(scores.avgConfidence),
          problemSolving: round(scores.avgProblemSolving),
          clarity: round(scores.avgClarity),
        },
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─── Progress over time (score trend) ─────────────────────────────────────
router.get('/progress', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { limit = 20 } = req.query;

    const interviews = await Interview.find({ user: userId, status: 'completed' })
      .select('topic overallScore scoreBreakdown completedAt createdAt')
      .sort({ completedAt: 1 })
      .limit(Number(limit));

    const trend = interviews.map((iv, index) => ({
      index: index + 1,
      topic: iv.topic,
      overallScore: iv.overallScore,
      scores: iv.scoreBreakdown,
      date: iv.completedAt || iv.createdAt,
    }));

    res.json({ success: true, data: trend });
  } catch (err) {
    next(err);
  }
});

// ─── Weakness detection ────────────────────────────────────────────────────
router.get('/weaknesses', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const interviews = await Interview.find({ user: userId, status: 'completed' })
      .select('scoreBreakdown feedback.weaknesses topic')
      .sort({ createdAt: -1 })
      .limit(10);

    if (interviews.length === 0) {
      return res.json({ success: true, data: { weakAreas: [], commonWeaknesses: [] } });
    }

    // Score each area across all interviews
    const areas = ['technicalKnowledge', 'communication', 'confidence', 'problemSolving', 'clarity'];
    const areaTotals = {};
    areas.forEach((a) => (areaTotals[a] = 0));

    interviews.forEach((iv) => {
      areas.forEach((a) => {
        areaTotals[a] += iv.scoreBreakdown?.[a] || 0;
      });
    });

    const avgByArea = areas.map((a) => ({
      area: a,
      averageScore: Math.round(areaTotals[a] / interviews.length),
    }));

    // Areas scoring below 60 are "weak"
    const weakAreas = avgByArea.filter((a) => a.averageScore < 60).sort((a, b) => a.averageScore - b.averageScore);

    // Collect common weakness strings from feedback
    const allWeaknesses = interviews.flatMap((iv) => iv.feedback?.weaknesses || []);
    const weaknessCount = {};
    allWeaknesses.forEach((w) => {
      const key = w.toLowerCase().trim();
      weaknessCount[key] = (weaknessCount[key] || 0) + 1;
    });

    const commonWeaknesses = Object.entries(weaknessCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([text, count]) => ({ text, count }));

    res.json({ success: true, data: { weakAreas, commonWeaknesses, allAreaScores: avgByArea } });
  } catch (err) {
    next(err);
  }
});

// ─── Performance breakdown by topic ───────────────────────────────────────
router.get('/by-topic', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const agg = await Interview.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(String(userId)),
          status: 'completed',
        },
      },
      {
        $group: {
          _id: '$topic',
          count: { $sum: 1 },
          avgScore: { $avg: '$overallScore' },
          lastAttempt: { $max: '$completedAt' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const data = agg.map((item) => ({
      topic: item._id,
      count: item.count,
      averageScore: Math.round(item.avgScore),
      lastAttempt: item.lastAttempt,
    }));

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// ─── Recent interview history ──────────────────────────────────────────────
router.get('/history', authenticateToken, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id;

    const interviews = await Interview.find({ user: userId, status: 'completed' })
      .select('topic type difficulty overallScore scoreBreakdown completedAt duration questionCount')
      .sort({ completedAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Interview.countDocuments({ user: userId, status: 'completed' });

    res.json({
      success: true,
      data: interviews,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
