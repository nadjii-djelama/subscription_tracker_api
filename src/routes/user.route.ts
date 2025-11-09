import e, { Router } from "express";
import mongoose from "mongoose";
import User from "../models/user.model.ts";
import bcrypt from "bcrypt";

const router: Router = Router();

router.get("/all", async (req, res) => {
  res.json({ message: "nadji" });
});
router.get("/:id", async (req, res) => {
  res.json({ message: "nadji" });
});
router.post("/create", async (req, res) => {});
router.put("/edit", async (req, res) => {
  res.json({ message: "nadji" });
});
router.delete("/delete/:id", async (req, res) => {
  res.json({ message: "nadji" });
});

export default router;
