import { db } from '../config/database';

class UserRepository {
  async create(user) {
    const query = 'INSERT INTO users (userId, username, mail, passwordHash) VALUES (?, ?, ?, ?)';
    const params = [user.userId, user.username, user.mail, user.passwordHash];
    return await db.execute(query, params);
  }

  async findByEmail(mail) {
    const query = 'SELECT * FROM users WHERE mail = ?';
    const params = [mail];
    const result = await db.execute(query, params);
    return result.rows[0]; 
  }
}

export default new UserRepository();