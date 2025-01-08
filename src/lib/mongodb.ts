import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || ''; // MongoDB connection string
const options = {};

if (!uri) throw new Error('Please define the MONGODB_URI environment variable');

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Ensure MongoDB connection is reused across function calls
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve MongoDB connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, reuse existing connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

export async function dbConnect() {
  // Await the clientPromise and return the MongoClient
  return clientPromise;
}

export default clientPromise;
