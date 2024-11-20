import { v4 as uuidv4 } from 'uuid'; // Importing uuidv4 for generating unique message IDs

class Message {
  constructor(chatId, senderId, text) {
    this.messageId = uuidv4(); // Generate a unique messageId using uuidv4
    this.chatId = chatId; // Associate message with a specific chat
    this.senderId = senderId; // Message senderId
    this.date = new Date(); // Record the date of the message
    this.text = text; // Store the content of the message
  }
}

export default Message;
