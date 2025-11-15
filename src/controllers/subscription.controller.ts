import type { Request, Response, NextFunction } from "express";
import Subscription from "../models/subscription.model.ts";

const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newSubscription = new Subscription({
      ...req.body,
      user: req.user._id,
    });
    await newSubscription.save();
    return res.status(201).json({
      message: "subbscription created successfully",
      subscriptionInfo: newSubscription,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUserSubscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        message: "you are not authorized to view these subscriptions.",
      });
    }
    const getSubsc = await Subscription.find({ user: req.user._id });
    return res.status(200).json({ subscription: getSubsc });
  } catch (err) {
    next(err);
  }
};

export { createSubscription, getAllUserSubscriptions };
