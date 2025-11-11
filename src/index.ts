import express from "express";
import envConfig from "./config/env.config.ts";
import cookieParser from "cookie-parser";
// DB connection
import dbconnect from "./config/db.config.ts";
await dbconnect();

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Error middleware
import errorHandlerMiddleware from "./middlewares/error.middleware.ts";
app.use(errorHandlerMiddleware);

// Routes
import authRoute from "./routes/auth.route.ts";
app.use("/api/v1/auth", authRoute);

import userRoute from "./routes/user.route.ts";
app.use("/api/v1/user", userRoute);

import subscriptionRoute from "./routes/subscription.route.ts";
app.use("/api/v1/subscription", subscriptionRoute);
// server port
const port = process.env.PORT;
app.listen(port, () => console.log(`server run in port ${port}`));
