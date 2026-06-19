import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

dotenv.config();
// body parser
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
