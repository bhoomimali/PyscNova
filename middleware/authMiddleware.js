// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const protect = async (req, res, next) => {
  let token;

  // Check if the request headers have a token and it starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Get token from header (it's in the format "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using your JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Get user from the token's ID and attach it to the request object
      // We don't want the password, so we use .select('-password')
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Call the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401); // 401 = Not Authorized
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

module.exports = { protect };