//Import Application All Packages
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import * as path from "path";
import router from "./Routes/api.js";

import {
  DATABASE,
  PORT,
  MAX_JSON_SIZE,
  URL_ENCODED,
  REQUEST_LIMIT_TIME,
  REQUEST_LIMIT_NUMBER,
  WEB_CACHE,
} from "./app/config/confit.js";

const app = express();

// Apply Middlewares
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: false }));
app.use(hpp());
app.use(helmet());
app.use(cookieParser());

// Rate Limiting
const limit = rateLimit({
  windowsMs: REQUEST_LIMIT_TIME,
  max: REQUEST_LIMIT_NUMBER,
});
app.use(limit);

// Set ETag caching
app.set("etag", WEB_CACHE);

// Use Router
app.use("/api", router);
app.use(express.static("Storage"));

//Mongodb Connections
mongoose
  .connect(DATABASE, { autoIndex: true })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error: ");
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
