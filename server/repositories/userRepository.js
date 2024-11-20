import { db } from '../config/database.js'; // Import database configuration to interact with the database

class UserRepository {
  
  // Create a new user in the database
  async create(user) {
    const query = 'INSERT INTO users (userId, username, mail, passwordHash) VALUES (?, ?, ?, ?)';
    const params = [user.userId, user.username, user.mail, user.passwordHash];
    return await db.execute(query, params); // Execute the query to insert the user into the database
  }

  // Find a user by their email
  async findByEmail(mail) {
    const query = 'SELECT * FROM users WHERE mail = ?';
    const params = [mail];
    const result = await db.execute(query, params);
    return result.rows[0]; // Return the first user that matches the email
  }

  // Method to get the userId by username
  async findUserIdByUsername(username) {
    const query = 'SELECT userId FROM users WHERE username = ?';
    const result = await db.execute(query, [username]);
    if (result.rows.length === 0) {
      return null; // Return null if no user is found
    }
    return result.rows[0].userId; // Return the userId
  }

  // Check if the username or email is already in use
  async isUnique(username, mail) {
    const query = 'SELECT * FROM users WHERE username = ? OR mail = ?';
    const params = [username, mail];
    const result = await db.execute(query, params);
    return result.rows.length === 0; // Return true if no user is found, meaning both username and email are unique
  }
}

export default new UserRepository(); // Export a singleton instance of UserRepository
