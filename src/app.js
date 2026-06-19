import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/dbConfig.js";

import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";

import globalErrorHandler from "./controllers/errorController.js";

const app = express();

dotenv.config();

connectDB();

// body parser
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
