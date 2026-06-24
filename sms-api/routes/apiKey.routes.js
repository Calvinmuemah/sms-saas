import express from "express";
import {
  getApiKey,
  createApiKey,
  deleteApiKey,
} from "../controllers/apiKey.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getApiKey);
router.post("/", createApiKey);
router.delete("/:id", deleteApiKey);

export default router;