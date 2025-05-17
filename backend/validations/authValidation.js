const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(5).required().messages({
    "string.min": "Password must be at least 5 characters",
    "any.required": "Password is required",
  }),
  requestedRole: Joi.string().valid("admin", "user").required().messages({
    "any.only": "Role must be either 'admin' or 'user'",
    "any.required": "Role is required",
  }),
});

module.exports = { loginSchema };
