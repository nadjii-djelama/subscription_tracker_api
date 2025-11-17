import mongoose from "mongoose";
import envConfig from "./env.config.ts";

const dbconnect = async () => {
  try {
    const dburl = process.env.DB_URI as string;
    if (!dburl) {
      throw new Error("Database URI not found in environment variables");
    }
    await mongoose.connect(dburl);
    console.log("✅ Database connected successfully");
  } catch (err: any) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1); // Exit if DB connection fails
  }
};

export default dbconnect;
