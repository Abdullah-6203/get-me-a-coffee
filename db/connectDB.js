import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/Coffee", {
      serverSelectionTimeoutMS: 5000, // fail fast instead of hanging 10s
    });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDb;