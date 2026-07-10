const Interview = require('../models/Interview');

exports.userHistory = async (req, res) => {
  try {
    const list = await Interview.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(100);
    // simple metrics: map createdAt and scores
    const metrics = list.map(i => ({ id: i._id, createdAt: i.createdAt, scores: i.scores }));
    return res.json({ list, metrics });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.trends = async (req, res) => {
  try {
    const list = await Interview.find({ user: req.user._id }).sort({ createdAt: 1 });
    // produce simple trend arrays for frontend graphs
    const trend = list.map(i => ({ date: i.createdAt, confidence: i.scores.confidence, communication: i.scores.communication }));
    // weakness aggregation
    const weaknesses = {};
    list.forEach(i => {
      if (!i.summary) return;
      const parts = i.summary.split(';');
      if (parts[1]) {
        parts[1].split(',').map(p => p.trim()).forEach(w => { if (!w) return; weaknesses[w] = (weaknesses[w]||0)+1; });
      }
    });
    return res.json({ trend, weaknesses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
