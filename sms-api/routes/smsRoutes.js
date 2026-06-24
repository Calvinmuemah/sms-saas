import express from "express";
import * as smsController from "../controllers/smsController.js";
import { requireApiKeyOrUserAuth } from "../middleware/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limit: Max 100 send requests per 15 minutes per IP
const sendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    error: "Too many requests. SMS sending limit is capped at 100 requests per 15 minutes. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/callback", smsController.smsCallback);
router.post("/optin", smsController.optIn);
router.post("/send", sendLimiter, requireApiKeyOrUserAuth, smsController.sendSMS);
router.post("/delivery-report", smsController.deliveryReport);
router.get("/messages", requireApiKeyOrUserAuth, smsController.getAllMessages);

export default router;