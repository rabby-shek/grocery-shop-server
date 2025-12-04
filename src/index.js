import dotenv from "dotenv";
dotenv.config({ path: './.env' });  // Correct path

import app from "./app.js";
import connectDatabase from "./config/database.js";




const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(8000, () => {
      console.log("Server is running on http://localhost:8000");
    });

  } catch (error) {
    console.log('Error while starting the server:', error.message);
    process.exit(1);
  }
};

startServer();
