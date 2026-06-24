import express from "express";
import {
  getBilling,
  changePlan,
  recharge,
  rechargePaystack,
} from "../controllers/billing.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getBilling);
router.post("/recharge", recharge);
router.post("/paystack", rechargePaystack);
router.post("/plan", changePlan);

export default router;
