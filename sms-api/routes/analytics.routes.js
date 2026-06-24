import express from "express";
import { get } from "../controllers/analytics.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", requireAuth, get);

export default router;