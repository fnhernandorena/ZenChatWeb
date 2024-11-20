import MessageRepository from '../repositories/messageRepository.js'; // Import MessageRepository
import Message from '../classes/messageClass.js'; // Import Message class for object construction

// Function to send a message
export const sendMessage = async (req, res) => {
    const senderId = req.user.userId;  
    const { chatId, text } = req.body;

  try {
    // Create a new Message object
    const message = new Message(chatId, senderId, text);
    
    // Save the message in the database
    await MessageRepository.create(message);
    
    // Return a success response
    res.status(201).send({ message: 'Message sent successfully', messageId: message.messageId });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({ message: 'Error sending message', error: error.message });
  }
};

// Function to get messages by chatId
export const getMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;
  
  try {
    const messages = await MessageRepository.findByChatId(chatId);
    
    if (messages.length === 0) {
      return res.status(404).send({ message: 'No messages found for this chat' });
    }

    // Return the messages in the response
    res.status(200).send({ messages });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).send({ message: 'Error retrieving messages', error: error.message });
  }
};
