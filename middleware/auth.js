const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    console.log('Auth Headers:', req.headers);
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);
    
    const token = authHeader?.replace('Bearer ', '');
    console.log('Extracted Token:', token);
    
    if (!token) {
      throw new Error('No token provided');
    }

    console.log('JWT Secret:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};

module.exports = { auth, checkRole };