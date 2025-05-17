const logger = require("../logger");

const authorizeAdmin = (req, res, next) => {
  logger.info(`authorizeAdmin: Checking role for userId=${req.user.userId}`);

  if (req.user.role !== "admin") {
    logger.warn(`authorizeAdmin: Access denied. Role=${req.user.role}`);
    return res.status(403).json({ code: "NOT_AUTHORIZED" });
  }

  logger.info("authorizeAdmin: Authorized as admin");
  next();
};

module.exports = authorizeAdmin;
