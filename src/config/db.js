const { MongoClient } = require('mongodb');
require('dotenv').config();

let dbConnection;
let client;

const reconnectToDb = async () => {
  try {
    console.log('Attempting to reconnect to MongoDB...');
    await connectToDb();
  } catch (error) {
    console.error('Error reconnecting to MongoDB:', error);
    // Try to reconnect after 5 seconds
    setTimeout(reconnectToDb, 5000);
  }
};

const connectToDb = async () => {
  try {
    // Close existing connection if it exists
    if (client) {
      await client.close();
    }

    // Create new connection
    client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000
    });

    // Connect to MongoDB
    await client.connect();
    dbConnection = client.db();

    // Test the connection
    await dbConnection.command({ ping: 1 });
    console.log('Connected to MongoDB Atlas');

    // Handle connection errors
    client.on('error', (error) => {
      console.error('MongoDB error:', error);
      reconnectToDb();
    });

    client.on('close', () => {
      console.log('MongoDB connection closed. Attempting to reconnect...');
      reconnectToDb();
    });

    return dbConnection;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

const getDb = () => {
  if (!dbConnection || !client?.topology?.isConnected()) {
    throw new Error('Database not initialized or not connected');
  }
  return dbConnection;
};

// Handle application shutdown
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  }
});

module.exports = { connectToDb, getDb };