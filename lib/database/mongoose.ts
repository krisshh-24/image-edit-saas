import mongoose ,{ Mongoose } from 'mongoose';

const MONGODB_URL=process.env.MONGODB_URL;

interface MongoDBConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongoDBConnection = (global as any).mongoose;

if(!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase =async () => {
     if(cached.conn) {
        return cached.conn;}
     if(!MONGODB_URL) {
        throw new Error('Missinig env MONGODB_URL');
    }
    cached.promise =
    cached.promise||
     mongoose.connect(MONGODB_URL, {
        dbName:'AIimage',
        bufferCommands: false})

    cached.conn = await cached.promise;
    return cached.conn;
    
}