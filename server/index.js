import { createServer } from 'node:http';
import app from './app.js';
import { Server } from 'socket.io';

const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server);

// Socket.io logic here
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
