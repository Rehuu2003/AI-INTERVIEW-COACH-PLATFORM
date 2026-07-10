require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/auth');
const interviewRoutes = require('./src/routes/interview');
const analyticsRoutes = require('./src/routes/analytics');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect DB
connectDB();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'AI Interview Backend' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
