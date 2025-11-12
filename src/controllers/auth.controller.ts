import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import envConfig from "../config/env.config.ts";
import jwt from "jsonwebtoken";
import User from "../models/user.model.ts";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: "Name, Email and Password are required." });
    }
    const findUser = await User.findOne({ $or: [{ name }, { email }] }).session(
      session
    );

    // Check if the user is already exist
    if (findUser) {
      await session.abortTransaction();
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
      { expiresIn: "1d" }
    );
    await newUser.save({ session });
    await session.commitTransaction();
    return res
      .status(201)
      .json({ message: "User created", user: { name, email }, Token: token });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    session.endSession();
  }
};
const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required." });
    }
    const findUser = await User.findOne({ email }).select("+password");
    if (!findUser) {
      return res.status(404).json({ message: "User not found. try again." });
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Wrong password, try with a different one." });
    }
    const token = jwt.sign(
      { id: findUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      message: "User logged In",
      user: { name: findUser.name, email: findUser.email },
      Token: token,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};
const signOut = async (req: Request, res: Response) => {};

export { signUp, signIn, signOut };
