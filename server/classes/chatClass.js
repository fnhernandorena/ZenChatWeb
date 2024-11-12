import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // Importing uuidv4 for generating unique user IDs

class User {
  constructor(username, mail, password) {
    this.userId = uuidv4(); // Generate a unique userId using uuidv4
    this.username = username;
    this.mail = mail;
    this.passwordHash = null;
    this.setPassword(password); // Hash the password upon user creation
  }

  // Hashes the password and stores it securely
  async setPassword(password) {
    const salt = await bcrypt.genSalt(10); // Generate a salt for password hashing
    this.passwordHash = await bcrypt.hash(password, salt); // Store the hashed password
  }

  // Static method to validate if the provided password matches the hashed one
  static async validatePassword(inputPassword, storedHash) {
    const isMatch = await bcrypt.compare(inputPassword, storedHash); // Compare input password with stored hash
    return isMatch; // Return true if passwords match, false otherwise
  }
}

export default User;
