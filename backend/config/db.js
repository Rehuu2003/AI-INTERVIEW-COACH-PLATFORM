const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.error('👉 Fix: Go to MongoDB Atlas → Network Access → Add 0.0.0.0/0');
  }
};

// Middleware to block DB routes when not connected
const requireDB = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database is not connected. Please check MongoDB Atlas Network Access settings and ensure your IP is whitelisted.',
    });
  }
  next();
};

module.exports = { connectDB, requireDB };
