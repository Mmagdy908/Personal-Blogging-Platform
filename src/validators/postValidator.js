import Joi from "joi";

import { AppError } from "../util/appError.js";

const createPostSchema = Joi.object({
  title: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
});

const updatePostSchema = Joi.object({
  title: Joi.string().trim(),
  content: Joi.string().trim(),
});

export const validateCreatePostInput = (data) => {
  const { error, value } = createPostSchema.validate(data);
  if (error) {
    throw new AppError(400, error.details[0].message.replace(/['"]/g, ""));
  }
  return value;
};

export const validateUpdatePostInput = (data) => {
  const { error, value } = updatePostSchema.validate(data);
  if (error) {
    throw new AppError(400, error.details[0].message.replace(/['"]/g, ""));
  }
  return value;
};
