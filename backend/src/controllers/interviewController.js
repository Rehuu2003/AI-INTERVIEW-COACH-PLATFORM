const Interview = require('../models/Interview');
const { generateFollowUp, analyzeTranscript } = require('../utils/aiService');

exports.startInterview = async (req, res) => {
  try {
    const interview = await Interview.create({ user: req.user._id, title: req.body.title || 'Mock Interview' });
    return res.json(interview);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.addMessage = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ error: 'Interview not found' });
    if (!interview.user.equals(req.user._id)) return res.status(403).json({ error: 'Forbidden' });

    // push user message
    interview.messages.push({ role: 'user', text });

    // generate assistant follow-up
    const followUp = generateFollowUp(text);
    interview.messages.push({ role: 'assistant', text: followUp });

    // update questions list (simple)
    interview.questions.push({ text: followUp, answer: '', score: 0 });

    // analyze transcript and update scores
    const analysis = analyzeTranscript(interview.messages);
    interview.scores.confidence = analysis.confidence;
    interview.scores.communication = analysis.communication;
    interview.summary = `Words: ${analysis.words}; weaknesses: ${analysis.weaknesses.join(', ')}`;

    await interview.save();

    return res.json({ interview, followUp, analysis });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const list = await Interview.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ error: 'Not found' });
    if (!interview.user.equals(req.user._id)) return res.status(403).json({ error: 'Forbidden' });
    return res.json(interview);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
