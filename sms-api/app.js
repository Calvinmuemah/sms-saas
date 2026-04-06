import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express from "express";
import cors from "cors";

import smsRoutes from "./routes/smsRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routes
app.use("/api/v1", smsRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;