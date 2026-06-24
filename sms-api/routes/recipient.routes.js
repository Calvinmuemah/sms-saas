import express from "express";
import { createRecipient, fetchRecipients } from "../controllers/recipient.controller.js";
import { updateRecipient, deleteRecipient } from "../controllers/recipient.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);

// Route to create a recipient group
router.post("/", createRecipient);

// Route to fetch all recipient groups
router.get("/", fetchRecipients);

// Route to update a recipient group
router.put("/:id", updateRecipient);

// Route to delete a recipient group
router.delete("/:id", deleteRecipient);

export default router;