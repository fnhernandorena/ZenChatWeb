import UserRepository from '../repositories/userRepository.js'; // User repository for database interactions
import User from '../classes/userClass.js'; // User model
import { generateToken } from '../middlewares/authMiddleware.js'; // Import the token generation middleware

// Static method to get a user by username
export const getUserByUsername = async (username) => {
  try {
    const user = await UserRepository.findUserIdByUsername(username); // Assuming this method exists in your UserRepository
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Signup function to register a new user
export const signup = async (req, res, next) => {
  const { username, mail, password } = req.body;
 
  try {
    // Check if username or email is already in use
    const userExists = await UserRepository.findByEmail(mail);
    if (userExists) {
      return res.status(400).send({ message: 'Username or email already in use' });
    }

    // Create a new user object (password will be hashed)
    const user = new User(username, mail, password);
     // Wait for the password hashing to complete
     await user.setPassword(password);  // Ensure that the password is hashed before saving

    await UserRepository.create(user);

    // Add user to the request object for use in the token generation middleware
    req.user = user;

    // Call the next middleware (generate token)
    generateToken(req, res, () => {
      // Send response with token
      res.status(201).send({ message: 'User created successfully', token: res.token });
    });
  } catch (error) {
    res.status(500).send({ message: 'Error creating user', error: error.message });
  }
};

// Signin function to login an existing user
export const signin = async (req, res, next) => {
  const { mail, password } = req.body;

  try {
    // Check if the user exists by email
    const user = await UserRepository.findByEmail(mail);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await User.validatePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // Add user to the request object for use in the token generation middleware
    req.user = user;

    // Call the next middleware (generate token)
    generateToken(req, res, () => {
      // Send response with token
      res.status(200).send({ message: 'Login successful', token: res.token });
    });
  } catch (error) {
    res.status(500).send({ message: 'Error during login', error: error.message });
  }
};
