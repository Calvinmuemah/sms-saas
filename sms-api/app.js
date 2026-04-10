import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express from "express";
import cors from "cors";

import smsRoutes from "./routes/smsRoutes.js";
import campaignRoutes from "./routes/campaign.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import scheduledRoutes from "./routes/scheduled.routes.js";
import apiRoutes from "./routes/scheduled.routes.js";
import profileRoutes from "./routes/scheduled.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import recipientRoutes from "./routes/recipient.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://sms-saas-psi.vercel.app",
  })
);

// Routes
app.use("/api/v1", smsRoutes);
app.use("/api/v1/campaigns", campaignRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/scheduled", scheduledRoutes);
app.use("/api/v1/api-key", apiRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/recipients", recipientRoutes);


// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;