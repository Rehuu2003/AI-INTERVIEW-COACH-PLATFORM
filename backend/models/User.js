const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never return password in queries by default
    },
    avatar: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
      maxlength: [300, 'Bio cannot exceed 300 characters'],
    },
    targetRole: {
      type: String,
      default: '',
    },
    experience: {
      type: String,
      enum: ['entry', 'mid', 'senior', 'lead', ''],
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    totalInterviews: {
      type: Number,
      default: 0,
    },
    averageScore: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Recalculate averageScore from interview history
userSchema.methods.updateStats = async function () {
  const Interview = mongoose.model('Interview');
  const interviews = await Interview.find({ user: this._id, status: 'completed' });

  this.totalInterviews = interviews.length;

  if (interviews.length > 0) {
    const total = interviews.reduce((sum, iv) => sum + (iv.overallScore || 0), 0);
    this.averageScore = Math.round(total / interviews.length);
  }

  await this.save();
};

module.exports = mongoose.model('User', userSchema);
