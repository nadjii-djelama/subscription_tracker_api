import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.ts";
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getUsers = await User.find().select("name email token createdAt");
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
    const user = await User.findById(id).select("name email token createdAt");
    if (!user) {
      return res.status(201).json({ message: "User doesn't exist." });
    }
    return res.status(200).json({ user: user });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Internal error", error: err.message });
  }
};

export { getAllUsers, getUserById };
