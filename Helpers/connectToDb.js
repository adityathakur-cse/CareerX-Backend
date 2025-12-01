import mongoose from "mongoose";

export async function connectToDb() {
  const DB_URI = process.env.DATABASE_URL;
  try {
    const conn = await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
}
