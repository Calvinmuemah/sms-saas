import express from "express";
import { fetchUserCounts } from "../controllers/user.controller.js";

const router = express.Router();

// Route to fetch user counts
router.get("/counts", fetchUserCounts);

export default router;