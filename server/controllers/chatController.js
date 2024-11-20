import ChatRepository from '../repositories/chatRepository.js'
import { getUserByUsername  } from '../controllers/userController.js'
import Chat from '../classes/chatClass.js';

// Function to get chat data (for now, just returns the authenticated user)
export const getChats = async (req, res) => {
  const { page = 0 } = req.query; // Get the 'page' query parameter, default to 0
  const limit = 15; // Number of chats per request
  const offset = page * limit; // Calculate the offset based on the page

  try {
    const chats = await ChatRepository.getChats(limit, offset);
    res.status(200).send(chats);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching chats', error: error.message });
  }
};
  
// Create a new chat between two users
export const newChat = async (req, res) => {
  const { username } = req.body; // The username of the recipient (user1)
  const user0 = req.user.userId; // The userId of the sender (user0), assumed to be authenticated

  try {
    // Fetch the recipient's userId using the UserController
    const user1 = await getUserByUsername(username);
    if (!user1) {
      return res.status(404).send({ message: 'Recipient not found' });
    }

    // Check if the chat already exists between user0 and user1
    const existingChat = await ChatRepository.findChat(user0, user1);
    if (existingChat != 0) {
      return res.status(400).send({ message: 'Chat already exists' });
    }

    // Create a new Chat object (chatId is generated inside the class)
    const newChat = new Chat(user0, user1);
    // Save the new chat into the database
    await ChatRepository.createChat(newChat);

    // Respond with success message
    res.status(201).send({ message: 'Chat created successfully', chatId: newChat.chatId });
  } catch (error) {
    res.status(500).send({ message: 'Error creating chat', error: error.message });
  }
};
  