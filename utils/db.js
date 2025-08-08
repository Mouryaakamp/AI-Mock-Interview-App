import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("Please define MONGO_URL in your .env file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectionTodb = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, {
      dbName: "mock-interview",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectionTodb;
