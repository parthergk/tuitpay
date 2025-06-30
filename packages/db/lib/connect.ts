import mongoose from "mongoose";
console.log("Env uri",process.env.MONGODB_URI);

const DB_URI = process.env.MONGODB_URI;

if (!DB_URI) {
  throw new Error("please check the db uri string");
}

let cached = global.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promis: null };
}

export async function connectTodb(){
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promis) {
    cached.promis = mongoose.connect(DB_URI!).then(()=>mongoose.connection);
  }

  try {
    cached.conn = await cached.promis;
  } catch (error) {
    cached.promis = null;
    throw error;
  }

  return cached.conn;
}