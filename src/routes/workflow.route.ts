import type { Request, Response } from "express";
import { Router } from "express";
import { workflowClient } from "../config/upstash.config.ts";
import { sendReminders } from "../controllers/workflow.controller.ts";
const router = Router();

router.post("/", sendReminders);

export default router;
