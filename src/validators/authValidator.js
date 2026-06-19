import Joi from "joi";

import { AppError } from "../util/appError.js";

const registerSchema = Joi.object({
  name: Joi.string().alphanum().trim().required(),
  email: Joi.string().email().normalize().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().normalize().required(),
  password: Joi.string().min(8).required(),
});

export const validateRegisterInput = (data) => {
  const { error, value } = registerSchema.validate(data);
  if (error) {
    throw new AppError(400, error.details[0].message.replace(/['"]/g, ""));
  }
  return value;
};

export const validateLoginInput = (data) => {
  const { error, value } = loginSchema.validate(data);
  if (error) {
    throw new AppError(400, error.details[0].message.replace(/['"]/g, ""));
  }
  return value;
};
