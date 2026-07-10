const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  bio: { type: String },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: ProfileSchema, default: {} },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
