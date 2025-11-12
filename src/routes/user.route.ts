import e, { Router } from "express";
import User from "../models/user.model.ts";
import { getAllUsers, getUserById } from "../controllers/user.controller.ts";
import { authorization } from "../middlewares/auth.middleware.ts";

const router: Router = Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);

export default router;
