import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import envConfig from "../config/env.config.ts";
import jwt from "jsonwebtoken";
import User from "../models/user.model.ts";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, password, email } = req.body;
    const findUser = await User.findOne({ $or: [{ name }, { email }] });

    // Check if the user is already exist
    if (findUser) {
      await session.commitTransaction();
      session.endSession();
      return res
        .status(409)
        .json({ message: "User already exists. try again." });
    }
    // Hash password and create the user
    const hashedpassword: string = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedpassword,
    });
    // Generate the token and save user
    const token: string = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1D" }
    );
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created", user: { name, email }, Token: token });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};
const signIn = async (req: Request, res: Response, next: NextFunction) => {};
const signOut = async (req: Request, res: Response, next: NextFunction) => {};

export { signUp, signIn, signOut };
