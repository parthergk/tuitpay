import mongoose, { Connection } from "mongoose";


const DB_URI = process.env.MONGODB_URI;

if (!DB_URI) {
  throw new Error("please check the db uri string");
}

let cached: {
  conn: Connection | null;
  promis: Promise<Connection> | null;
} = {
  conn: null,
  promis: null
};

async function connectTodb(){
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

export default connectTodb;