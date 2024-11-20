import { createServer } from 'node:http';
import app from './app.js'; // Import the Express application
import { Server } from 'socket.io';

const port = process.env.PORT || 3000;
const server = createServer(app); // Create an HTTP server based on the Express app
const io = new Server(server, {
  cors: {
    origin: '*', // Allow connections from any origin (adjust as needed for your security requirements)
    methods: ['GET', 'POST'] // Allowed HTTP methods
}});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log(`New socket connection: ${socket.id}`);

  // Event listener for incoming chat messages
  socket.on('chat message', (msg) => {
    console.log(`Message received: ${msg}`);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Event listener for when a client disconnects
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});