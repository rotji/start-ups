import { Collection, ObjectId } from 'mongodb';
import { Startup } from '../../../core/Startup';
import { StartupRepository } from '../../../core/repositories/StartupRepository';
import { connectMongo, getDb } from '../db/mongoClient';

const DB_NAME = 'startups_db'; // Change as needed
const COLLECTION_NAME = 'startups';

export class MongoStartupRepository implements StartupRepository {
  private collection: Collection<Startup>;

  constructor(collection?: Collection<Startup>) {
    this.collection = collection || getDb(DB_NAME).collection<Startup>(COLLECTION_NAME);
    console.log('[MongoStartupRepository] Using DB:', DB_NAME, 'Collection:', COLLECTION_NAME);
  }

  async create(startup: Startup): Promise<Startup> {
    console.log('[MongoStartupRepository] Creating startup:', JSON.stringify(startup, null, 2));
    const result = await this.collection.insertOne(startup);
    console.log('[MongoStartupRepository] Insert result:', result.insertedId);
    return startup;
  }

  async update(id: string, updates: Partial<Startup>): Promise<Startup | null> {
    const result = await this.collection.findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after' }
    );
    return result || null;
  }

  async findById(id: string): Promise<Startup | null> {
    return this.collection.findOne({ id });
  }

  async findAll(filter: Partial<Startup> = {}): Promise<Startup[]> {
    console.log('[MongoStartupRepository] Finding all startups with filter:', filter);
    const startups = await this.collection.find(filter).toArray();
    console.log('[MongoStartupRepository] Found startups:', startups.length);
    return startups;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ id });
    return result.deletedCount === 1;
  }
}
