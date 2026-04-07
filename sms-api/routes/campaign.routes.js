import express from "express";
import * as ctrl from "../controllers/campaign.controller.js";

const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", ctrl.create);
router.post("/:id/send", ctrl.send);

export default router;