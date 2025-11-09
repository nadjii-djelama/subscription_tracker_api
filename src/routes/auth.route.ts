import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router: Router = Router();

// Sign up
router.post("/sign-up", async (req, res) => {
  res.json({ message: "welcome in the auth page" });
});

// Sign in
router.post("/sign-in", async (req, res) => {
  res.json({ message: "welcome in the auth page" });
});

// Sign out
router.post("/sign-out", async (req, res) => {
  res.json({ message: "welcome in the auth page" });
});

export default router;
