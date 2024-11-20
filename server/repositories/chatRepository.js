import { db } from '../config/database.js';

class ChatRepository {
    
  // Find an existing chat between two users
  async findChat(user0, user1) {
    const query = `SELECT * FROM chats WHERE (user0 = ? AND user1 = ?) OR (user0 = ? AND user1 = ?) LIMIT 1`;
    const result = await db.execute(query, [user0, user1, user1, user0]); // Query both possible user pairs
    return result.rows.length;
  }
//Find existing chat with chatId
  async findById(chatId) {
    const query = 'SELECT * FROM chats WHERE chatId = ? LIMIT 1';
    const result = await db.get(query, [chatId]);
    return result;
  }

  // Create a new chat
  async createChat(newChat) {
    const query = `INSERT INTO chats (chatId, user0, user1, lastmsg) VALUES (?, ?, ?, ?)`;
    const result = await db.execute(query, [newChat.chatId, newChat.user0, newChat.user1,  newChat.lastmsg]);
    return result;
  }

    // Fetch chats with pagination using LIMIT and OFFSET
  async getChats(limit = 15, offset = 0) {
    const query = 'SELECT * FROM chats ORDER BY lastmsg DESC LIMIT ? OFFSET ?';
    const result = await db.execute(query, [limit, offset]);
    return result.rows; // Assumes 'rows' contains the query results
  }
  }
  
  export default new ChatRepository();
  