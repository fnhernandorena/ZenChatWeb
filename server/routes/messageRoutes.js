import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js'; // Import the token verification middleware
import { sendMessage } from '../controllers/messageController.js';

const router = express.Router();

// Protect routes with the verifyToken middleware
router.post('/', verifyToken, sendMessage); 

export default router;