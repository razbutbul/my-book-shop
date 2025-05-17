const jwt = require("jsonwebtoken");
const logger = require("../logger");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  logger.info("authenticateUser: Checking token...");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.warn("authenticateUser: No token provided");
    return res.status(401).json({ code: "NO_TOKEN_PROVIDED" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    logger.info(
      `authenticateUser: Token verified for userId=${decoded.userId}, role=${decoded.role}`
    );
    next();
  } catch (error) {
    logger.warn("authenticateUser: Invalid token");
    return res.status(401).json({ code: "INVALID_TOKEN" });
  }
};

module.exports = authenticateUser;
