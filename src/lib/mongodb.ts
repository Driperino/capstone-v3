import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || ''; // MongoDB connection string
const options = {};

if (!uri) throw new Error('Please define the MONGODB_URI environment variable');

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

// Ensure MongoDB connection is reused in development
if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function dbConnect() {
  // Await the clientPromise and return the MongoClient
  return clientPromise;
}

export default clientPromise;
