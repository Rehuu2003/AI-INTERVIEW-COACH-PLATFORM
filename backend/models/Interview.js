const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['assistant', 'user'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const scoreBreakdownSchema = new mongoose.Schema(
  {
    technicalKnowledge: { type: Number, default: 0, min: 0, max: 100 },
    communication: { type: Number, default: 0, min: 0, max: 100 },
    confidence: { type: Number, default: 0, min: 0, max: 100 },
    problemSolving: { type: Number, default: 0, min: 0, max: 100 },
    clarity: { type: Number, default: 0, min: 0, max: 100 },
  },
  { _id: false }
);

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    topic: {
      type: String,
      required: [true, 'Interview topic is required'],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    type: {
      type: String,
      enum: ['technical', 'behavioral', 'system-design', 'mixed'],
      default: 'mixed',
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'abandoned'],
      default: 'in-progress',
    },
    // Full conversation transcript
    messages: [messageSchema],
    // AI-generated analysis after completion
    feedback: {
      summary: { type: String, default: '' },
      strengths: { type: [String], default: [] },
      weaknesses: { type: [String], default: [] },
      improvements: { type: [String], default: [] },
      detailedAnalysis: { type: String, default: '' },
    },
    // Scoring
    overallScore: { type: Number, default: 0, min: 0, max: 100 },
    scoreBreakdown: { type: scoreBreakdownSchema, default: () => ({}) },
    // Metadata
    duration: { type: Number, default: 0 }, // seconds
    questionCount: { type: Number, default: 0 },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

// Index for fast analytics queries
interviewSchema.index({ user: 1, createdAt: -1 });
interviewSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Interview', interviewSchema);
