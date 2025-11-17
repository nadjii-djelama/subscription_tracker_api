// import type { Request, Response, NextFunction } from "express";
// import Subscription from "../models/subscription.model.ts";
// import { workflowClient } from "../config/upstash.config.ts";
// import envConfig from "../config/env.config.ts";

// const createSubscription = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     const newSubscription = new Subscription({
//       ...req.body,
//       user: req.user._id,
//     });
//     await workflowClient.trigger({ url, body, headers, workflowRunId, retries} : {
//       url : `${process.env.SERVER_URL}`
//     });
//     await newSubscription.save();
//     return res.status(201).json({
//       message: "subbscription created successfully",
//       subscriptionInfo: newSubscription,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// const getAllUserSubscriptions = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     if (!req.user || req.user._id.toString() !== req.params.id) {
//       return res.status(403).json({
//         message: "You are not authorized to view these subscriptions.",
//       });
//     }
//     const getSubsc = await Subscription.find({ user: req.user._id });
//     return res.status(200).json({ subscription: getSubsc });
//   } catch (err) {
//     next(err);
//   }
// };

// export { createSubscription, getAllUserSubscriptions };

import type { Request, Response, NextFunction } from "express";
import Subscription from "../models/subscription.model.ts";
import { workflowClient } from "../config/upstash.config.ts";
import envConfig from "../config/env.config.ts";

const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, price, frequency, category, paymentMethod, startDate } =
      req.body;

    if (
      !name ||
      !price ||
      !frequency ||
      !category ||
      !paymentMethod ||
      !startDate
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: name, price, frequency, category, paymentMethod, startDate",
      });
    }

    const newSubscription = new Subscription({
      name,
      price,
      frequency,
      category,
      paymentMethod,
      startDate,
      user: req.user._id,
    });

    await workflowClient.trigger({
      url: `${process.env.SERVER_URL}/webhook`,
      body: { subscriptionId: newSubscription._id },
      headers: { "Content-Type": "application/json" },
    });

    await newSubscription.save();
    return res.status(201).json({
      message: "subscription created successfully",
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
    if (!req.user || req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        message: "You are not authorized to view these subscriptions.",
      });
    }
    const getSubsc = await Subscription.find({ user: req.user._id });
    return res.status(200).json({ subscription: getSubsc });
  } catch (err) {
    next(err);
  }
};

export { createSubscription, getAllUserSubscriptions };
