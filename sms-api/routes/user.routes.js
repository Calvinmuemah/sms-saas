import express from "express";
import { fetchUserCounts } from "../controllers/user.controller.js";
import { fetchAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

// Route to fetch user counts
router.get("/counts", fetchUserCounts);

// Route to fetch all users
router.get("/", fetchAllUsers);
router.get("/all", fetchAllUsers);

export default router;