import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DATABASE_URL;
if (!uri) {
  throw new Error('DATABASE_URL is not set in environment variables');
}


const client = new MongoClient(uri);
let isConnected = false;

export async function connectMongo() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client;
}

export function getDb(dbName: string) {
  return client.db(dbName);
}
