const logger = require("../logger");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message).join("\n");
    logger.error(
      `Validation failed for ${req.method} ${req.originalUrl}:\n${messages}`
    );

    return res.status(400).json({ errors: messages });
  }

  logger.info(`Validation passed for ${req.method} ${req.originalUrl}`);

  next();
};

module.exports = validate;
