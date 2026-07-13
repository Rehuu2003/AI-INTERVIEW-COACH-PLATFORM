const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { authenticateToken };
