import express from "express";
import envConfig from "./config/env.config.ts";
import dbconnect from "./config/db.config.ts";
await dbconnect();
const app = express();

// server port
const port = process.env.PORT;
app.listen(port, () => console.log(`server run in port ${port}`));
