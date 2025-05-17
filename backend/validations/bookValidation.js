const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must be at least 2 characters",
    "any.required": "Title is required",
  }),

  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
    "any.required": "Price is required",
  }),

  book_description: Joi.string().min(5).max(1000).required().messages({
    "string.min": "Description must be at least 5 characters",
    "any.required": "Description is required",
  }),

  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "Stock must be a number",
    "number.min": "Stock cannot be negative",
    "any.required": "Stock is required",
  }),

  author_name: Joi.string().min(2).max(100).required().messages({
    "string.min": "Author name must be at least 2 characters",
    "any.required": "Author name is required",
  }),

  publisher_name: Joi.string().min(2).max(100).required().messages({
    "string.min": "Publisher name must be at least 2 characters",
    "any.required": "Publisher name is required",
  }),
});

const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "ID must be a number",
    "number.positive": "ID must be a positive number",
    "any.required": "ID is required",
  }),
});

module.exports = {
  createBookSchema,
  idParamSchema,
};
