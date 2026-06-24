import express from "express";
import * as smsController from "../controllers/smsController.js";
import { requireApiKeyOrUserAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/callback", smsController.smsCallback);
router.post("/optin", smsController.optIn);
router.post("/send", requireApiKeyOrUserAuth, smsController.sendSMS);
router.post("/delivery-report", smsController.deliveryReport);
router.get("/messages", requireApiKeyOrUserAuth, smsController.getAllMessages);

export default router;