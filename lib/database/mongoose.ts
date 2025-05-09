import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongoDBConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Augment the global object to add a typed `mongoose` property
declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: MongoDBConnection | undefined;
}

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached!.conn) return cached!.conn;

  if (!MONGODB_URL) {
    throw new Error('Missing MONGODB_URL in environment variables.');
  }

  cached!.promise =
    cached!.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'AIimage',
      bufferCommands: false,
    });

  cached!.conn = await cached!.promise;
  return cached!.conn;
};
