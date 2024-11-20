import jwt from 'jsonwebtoken';

// Secret key for signing JWT (use a secure value in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to generate a token for authenticated users and set a cookie
export const generateToken = (req, res, next) => {
  const { userId, username } = req.user; // Get user info from the request
  // Generate the token
  const token = jwt.sign({ userId, username }, JWT_SECRET, {
    expiresIn: '1w', // Token expires in 1 week
  });

  // Set cookie with the token
  res.cookie('authToken', token, {
    httpOnly: true, // Cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production', // Only sent over HTTPS in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
  });


  next(); // Proceed to the next middleware or route handler
};

// Middleware to verify the token from cookies
export const verifyToken = (req, res, next) => {
  // Retrieve the token from the 'authToken' cookie

  const token = req.cookies.authToken;
  
  // Check if the token is present
  if (!token) {
    return res.status(401).send({ message: 'Access denied, no token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user data to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(400).send({ message: 'Invalid or expired token' });
  }
};