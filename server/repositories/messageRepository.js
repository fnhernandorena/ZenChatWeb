import { db } from '../config/database.js';

class MessageRepository {
    async create(message) {
      console.log(message);
      const query = 'INSERT INTO messages (messageId, chatId, senderId, date, content) VALUES (?, ?, ?, ?, ?)';
      const params = [message.messageId, message.chatId, message.senderId, message.date, message.text];
      return await db.execute(query, params);
    }
  
    async findByChatId(chatId) {
      const query = 'SELECT * FROM messages WHERE chatId = ?';
      const params = [chatId];
      const result = await db.execute(query, params);
      return result.rows; // Return all chat messages
    }
  }
  
  export default new MessageRepository();
  