import express from "express";
import { fetchUserCounts, fetchAllUsers } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);

// Route to fetch user counts
router.get("/counts", fetchUserCounts);

// Route to fetch all users
router.get("/", fetchAllUsers);
router.get("/all", fetchAllUsers);

export default router;