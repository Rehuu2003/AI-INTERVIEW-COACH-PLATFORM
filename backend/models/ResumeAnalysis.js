const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fileName: { type: String, default: '' },
    targetRole: { type: String, default: '' },
    atsScore: { type: String, default: '0%' },
    technicalScore: { type: String, default: '0%' },
    hiringScore: { type: String, default: '0%' },
    strengths: { type: String, default: '' },
    improvements: { type: String, default: '' },
    missingSkills: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
