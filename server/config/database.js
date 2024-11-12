import { createClient } from '@libsql/client'; // Import the libSQL client

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Database connection setup using environment variables
const db = createClient({
  url: process.env.DB_URL, // Database URL from environment variables
  authToken: process.env.DB_TOKEN, // Authentication token from environment variables
});

// Export the database client so it can be used in other parts of the application
export { db };
