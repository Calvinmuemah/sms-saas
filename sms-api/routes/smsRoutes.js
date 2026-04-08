import express from "express";
import * as smsController from "../controllers/smsController.js";

const router = express.Router();

router.post("/callback", smsController.smsCallback);
router.post("/optin", smsController.optIn);
router.post("/send", smsController.sendSMS);
router.post("/delivery-report", smsController.deliveryReport);

export default router;