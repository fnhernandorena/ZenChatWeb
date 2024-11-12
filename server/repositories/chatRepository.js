import { db } from '../config/database';

class ChatRepository {
    async create(chat) {
      const query = 'INSERT INTO chats (chatId, user0, user1) VALUES (?, ?, ?)';
      const params = [chat.chatId, chat.user0, chat.user1];
      return await db.execute(query, params);
    }
  }
  
  export default new ChatRepository();
  