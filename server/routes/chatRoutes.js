import express from 'express';
import { getChats, newChat  } from '../controllers/chatController.js'; // Import your chat controller functions
import { verifyToken } from '../middlewares/authMiddleware.js'; // Import the token verification middleware

const router = express.Router();

// Protect routes with the verifyToken middleware
router.get('/', verifyToken, getChats); 
router.post('/newChat', verifyToken, newChat);

export default router;
