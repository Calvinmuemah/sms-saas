import express from "express";
import * as smsController from "../controllers/smsController.js";

const router = express.Router();

router.post("/sms/callback", smsController.smsCallback);
router.post("/optin", smsController.optIn);
router.post("/send", smsController.sendSMS);
router.post("/sms/dlr", smsController.deliveryReport);

export default router;