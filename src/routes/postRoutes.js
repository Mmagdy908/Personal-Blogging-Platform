import express from "express";

import postController from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware.isAuthenticated, postController.createPost);
router.get("/", postController.getAllPosts);

export default router;
