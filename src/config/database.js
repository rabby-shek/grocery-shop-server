// config/database.js
import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    mongoose.connect(process.env.MONGODB_ATLAS_URI);
    console.log("Database is Connected");

    mongoose.connection.on("error", (error) => {
      console.error("could not connect to database", error);
    });
  } catch (error) {
    console.error("Database connection failed", error.toString());
  }
};

export default connectDatabase;
