import dotenv from "dotenv";
dotenv.config({ quiet: true });

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { startScheduler } from "./services/schedulerService.js";

const startServer = async () => {
  try {
    // Connect to DB first
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      // Start background scheduler
      startScheduler();
    });

  } catch (error) {
    console.error("Failed to start server:");
    console.error(error);
    process.exit(1);
  }
};

startServer();