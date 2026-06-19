import postRepository from "../repositories/postRepository.js";
import {
  validateCreatePostInput,
  validateUpdatePostInput,
} from "../validators/postValidator.js";

const postController = {
  createPost: async (req, res, next) => {
    try {
      // 1) validate input
      const postData = validateCreatePostInput(req.body);
      // 2) create new post
      const newPost = await postRepository.create({
        ...postData,
        author: req.userId,
      });

      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      next(error);
    }
  },
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await postRepository.getAll();
      res.status(200).json({ length: posts.length, posts });
    } catch (error) {
      next(error);
    }
  },
  updatePost: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedpostData = validateUpdatePostInput(req.body);
      const updatedPost = await postRepository.update(id, updatedpostData);
      res
        .status(200)
        .json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
      next(error);
    }
  },
  deletePost: async (req, res, next) => {
    try {
      const { id } = req.params;
      await postRepository.delete(id);
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default postController;
