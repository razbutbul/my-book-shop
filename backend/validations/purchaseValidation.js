const Joi = require("joi");

const createPurchaseSchema = Joi.object({
  bookId: Joi.number().integer().positive().required().messages({
    "number.base": "Book ID must be a number",
    "number.positive": "Book ID must be a positive number",
    "any.required": "Book ID is required",
  }),

  phone: Joi.string()
    .pattern(/^0\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits and start with 0",
      "any.required": "Phone number is required",
    }),

  address: Joi.string().min(3).max(255).required().messages({
    "string.min": "Address must be at least 3 characters",
    "any.required": "Address is required",
  }),

  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),

  purchasePrice: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
    "any.required": "Purchase price is required",
  }),
});

module.exports = {
  createPurchaseSchema,
};
