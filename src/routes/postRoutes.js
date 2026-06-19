import express from "express";

import postController from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware.isAuthenticated, postController.createPost);
router.get("/", postController.getAllPosts);
router.put(
  "/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isPostAuthor,
  postController.updatePost,
);
router.delete(
  "/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.isPostAuthor,
  postController.deletePost,
);

export default router;
