import { Router } from "express";

const router: Router = Router();

router.get("/", async (req, res) => {
  res.json({ message: "get subscription" });
});

router.get("/:id", async (req, res) => {
  res.json({ message: "get subscription" });
});

router.post("/create", async (req, res) => {
  res.json({ message: "get subscription" });
});

router.put("/edit/:id", async (req, res) => {
  res.json({ message: "get subscription" });
});

router.delete("/delete/:id", async (req, res) => {
  res.json({ message: "get subscription" });
});

export default router;
