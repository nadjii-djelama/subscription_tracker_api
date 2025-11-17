import { Router } from "express";
import {
  createSubscription,
  getAllUserSubscriptions,
} from "../controllers/subscription.controller.ts";

const router: Router = Router();

router.get("/allusersubscriptions/:id", getAllUserSubscriptions);
router.post("/create", createSubscription);

export default router;
