// admin.validation.ts
import Joi from "joi";

export const createAdminSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(100).required(),
});

export const updateAdminSchema = Joi.object({
  username: Joi.string().min(3).max(50).optional(),
  password: Joi.string().min(6).optional(),
  email: Joi.string().email().optional(),
  name: Joi.string().min(2).max(100).optional(),
});
