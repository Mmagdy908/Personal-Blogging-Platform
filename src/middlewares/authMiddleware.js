import jwt from "jsonwebtoken";

import { AppError } from "../util/appError.js";

import postRepository from "../repositories/postRepository.js";

const asyncJwtVerify = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const authMiddleware = {
  isAuthenticated: async (req, res, next) => {
    const authHeader = req.headers.authorization;
    // check if the authorization header is provided
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next(new AppError(401, "Unauthorized"));
    }

    const token = authHeader.split(" ")[1];
    try {
      // verify token and get authenticated user
      const authenticatedUser = await asyncJwtVerify(
        token,
        process.env.JWT_SECRET,
      );

      req.user = authenticatedUser;
      next();
    } catch (error) {
      next(new AppError(401, "Unauthorized"));
    }
  },
  isPostAuthor: async (req, res, next) => {
    const { id } = req.params;
    const post = await postRepository.findById(id);
    if (!post) {
      return next(new AppError(404, "Post not found"));
    }
    if (post.author.toString() !== req.user.id) {
      return next(new AppError(403, "You are not the author of this post"));
    }
    next();
  },
};

export default authMiddleware;
