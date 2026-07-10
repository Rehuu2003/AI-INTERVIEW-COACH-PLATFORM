const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['system','assistant','user'], default: 'user' },
  text: { type: String },
  time: { type: Date, default: Date.now }
});

const QuestionSchema = new mongoose.Schema({
  text: String,
  answer: String,
  score: Number
});

const InterviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, default: 'Interview' },
  messages: [MessageSchema],
  questions: [QuestionSchema],
  summary: String,
  scores: {
    confidence: { type: Number, default: 0 },
    communication: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interview', InterviewSchema);
