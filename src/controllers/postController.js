import postRepository from "../repositories/postRepository.js";
import { validateCreatePostInput } from "../schemas/postSchema.js";

const postController = {
  createPost: async (req, res, next) => {
    try {
      // 1) validate input
      const postData = validateCreatePostInput(req.body);
      // 2) create new post
      const newPost = await postRepository.create({
        ...postData,
        author: req.user.id,
      });

      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      next(error);
    }
  },
};

export default postController;
