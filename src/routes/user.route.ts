import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.ts";

const router: Router = Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);

export default router;
