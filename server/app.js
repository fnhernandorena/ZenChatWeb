import express from 'express';
import authRoutes from './routes/authRoutes.js'; // Import authentication routes
import chatRoutes from './routes/chatRoutes.js'; // Import chat routes
import messageRoutes from './routes/messageRoutes.js'; // Import message routes
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json()); 
// Middleware for logging requests to the console
app.use(morgan('dev')); 
// Middleware for read cookies
app.use(cookieParser());

// Routes
// Route prefix for authentication-related endpoints
app.use('/auth', authRoutes); 
// Route prefix for chat-related endpoints
app.use('/chats', chatRoutes);
// Route prefix for message-related endpoints
app.use('/messages', messageRoutes);

export default app;
