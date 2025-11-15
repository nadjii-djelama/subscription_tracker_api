import { Router } from "express";
import {
  createSubscription,
  getAllUserSubscriptions,
} from "../controllers/subscription.controller.ts";

const router: Router = Router();

router.get("/", async (req, res) => {
  res.json({ message: "get subscription" });
});

router.get("/allusersubscriptions/:id", getAllUserSubscriptions);

router.post("/create", createSubscription);

router.put("/edit/:id", async (req, res) => {
  res.json({ message: "get subscription" });
});

router.delete("/delete/:id", async (req, res) => {
  res.json({ message: "get subscription" });
});

export default router;
