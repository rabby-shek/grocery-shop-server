import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import app from "./app.js";
import connectDatabase from "./config/database.js";


dotenv.config({ path: './.env' });  // Correct path


app.use("/api/auth", authRoutes);

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
