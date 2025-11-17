import express from "express";
import envConfig from "./config/env.config.ts";
import cookieParser from "cookie-parser";
import { authorization } from "./middlewares/auth.middleware.ts";
// DB connection
import dbconnect from "./config/db.config.ts";
await dbconnect();

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Arcjet security middleware
import arcjetMidleware from "./middlewares/arcjet.midleware.ts";
app.use(arcjetMidleware);

// Routes
import authRoute from "./routes/auth.route.ts";
app.use("/api/v1/auth", authRoute);

import userRoute from "./routes/user.route.ts";
app.use("/api/v1", authorization, userRoute);

import subscriptionRoute from "./routes/subscription.route.ts";
app.use("/api/v1/subscription", authorization, subscriptionRoute);

import workflowRoute from "./routes/workflow.route.ts";
app.use("/api/v1/workflows", authorization, workflowRoute);
// ErrorHandling middleware
import errorHandlerMiddleware from "./middlewares/error.middleware.ts";
app.use(errorHandlerMiddleware);

// server port
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`server run in port ${port}`)
);

// Handle server errors
server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
