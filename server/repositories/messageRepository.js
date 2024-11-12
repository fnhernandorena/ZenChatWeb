import { db } from '../config/database';

class MessageRepository {
    async create(message) {
      const query = 'INSERT INTO messages (messageId, chatId, sender, date, text) VALUES (?, ?, ?, ?, ?)';
      const params = [message.messageId, message.chatId, message.sender, message.date, message.text];
      return await db.execute(query, params);
    }
  
    async findByChatId(chatId) {
      const query = 'SELECT * FROM messages WHERE chatId = ?';
      const params = [chatId];
      const result = await db.execute(query, params);
      return result.rows; // Regresa todos los mensajes de ese chat
    }
  }
  
  export default new MessageRepository();
  