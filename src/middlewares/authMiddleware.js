import jwt from "jsonwebtoken";

import { AppError } from "../utils/appError.js";

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
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      next(new AppError(401, "Unauthorized"));
    }

    const token = authHeader.split(" ")[1];
    try {
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
};
