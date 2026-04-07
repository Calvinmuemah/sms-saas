import express from "express";
import {
  getApiKey,
  createApiKey,
  deleteApiKey,
} from "../controllers/apiKey.controller.js";

const router = express.Router();

router.get("/", getApiKey);
router.post("/", createApiKey);
router.delete("/", deleteApiKey);

export default router;