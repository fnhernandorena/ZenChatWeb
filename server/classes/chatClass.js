import { v4 as uuidv4 } from 'uuid'; // For generating unique chat IDs

class Chat {
  constructor(user0, user1, lastmsg = null) {
    this.chatId = uuidv4(); // Generate a unique chatId using uuidv4
    this.user0 = user0; // User 0 (creator)
    this.user1 = user1; // User 1 (recipient)
    this.lastmsg = lastmsg; // Last message, default is null
  }
}

export default Chat;
