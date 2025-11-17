import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config.ts";
import User from "../models/user.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err: any) {
    return res
      .status(401) // ❌ Should be 401 for auth errors, not 500
      .json({ message: "Internal error", error: err.message });
  }
};

export { authorization };
