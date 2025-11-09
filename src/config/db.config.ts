import mongoose from "mongoose";
import envConfig from "./env.config.ts";

const dbconnect = async () => {
  try {
    const dburl = process.env.DB_URI as string;
    if (!dburl) {
      console.log("we canot found your DB connection.");
    }
    await mongoose.connect(dburl);
    return console.log("DB Connected");
  } catch (err) {
    return console.log("Something Wrong, try again.");
  }
};

export default dbconnect;
