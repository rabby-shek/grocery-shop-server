import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import categoryRoutes from "./routes/product.routes.js";


dotenv.config({ path: './.env' });  // Correct path


// All api routes connection
app.use("/api/auth", authRoutes);
app.use('/api/app', categoryRoutes);



// server starting in here
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
