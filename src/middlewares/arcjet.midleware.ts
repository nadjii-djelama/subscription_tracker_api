import type { Request, Response, NextFunction } from "express";
import aj from "../config/arcjet.config.ts";

const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decision = await aj.protect(req as any, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res
          .status(429)
          .json({ message: "Too many requests. Please try again later." });
      if (decision.reason.isBot())
        return res.status(403).json({ message: "Access denied for bots." });
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  } catch (err) {
    console.log(`Arcjet error Message : ${err}`);
    next(err);
  }
};

export default arcjetMiddleware;
