import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import JSON Web Token for generating and verifying tokens
import UserRepository from '../repositories/userRepository'; // User repository for database interactions
import User from '../classes/userClass'; // User model

// Secret key for signing JWT (should be a secure, unique value)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Signup function to register a new user
export const signup = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    // Create a new User object (password will be hashed)
    const user = new User(username, mail, password);

    // Save the new user to the database
    await UserRepository.create(user);

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user', error: error.message });
  }
};

// Signin function to login an existing user
export const signin = async (req, res) => {
  const { mail, password } = req.body;

  try {
    // Check if the user exists by email
    const user = await UserRepository.findByEmail(mail);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Validate the password using bcrypt
    const isPasswordValid = await User.validatePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // If valid, create a JWT token
    const token = jwt.sign({ userId: user.userId, username: user.username }, JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).send({ message: 'Error during login', error: error.message });
  }
};

// Middleware to verify JWT in protected routes
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).send({ message: 'Access denied, no token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user data to the request
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(400).send({ message: 'Invalid or expired token' });
  }
};
