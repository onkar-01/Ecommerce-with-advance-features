import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MongoDB url in environment variables.");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection);
    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        throw new Error(`Error while connecting to Database ${error}`)
    }
}