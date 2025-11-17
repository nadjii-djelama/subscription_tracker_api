import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.ts";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getUsers = await User.find().select("name email createdAt"); // ❌ Removed "token" - doesn't exist in schema
    return res.status(200).json({ users: getUsers });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Internal Error", error: err.message });
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("name email createdAt"); // ❌ Removed "token"
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." }); // ❌ FIXED: Was 201 (Created) - should be 404 (Not Found)
    }
    return res.status(200).json({ user: user });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Internal error", error: err.message });
  }
};

export { getAllUsers, getUserById };
