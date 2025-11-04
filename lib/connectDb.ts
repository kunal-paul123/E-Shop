import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

// console.log(process.env.MONGODB_URI)

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please define MONGODB_URI environment variable");
  }

  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");

    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected successfully");
  } catch (error) {
    console.log("database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
