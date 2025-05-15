const authDAL = require("../dal/authDAL");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../logger");

const login = async (req, res) => {
  const { email, password, requestedRole } = req.body;

  try {
    const user = await authDAL.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ code: "INVALID_CREDENTIALS" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ code: "INVALID_CREDENTIALS" });
    }

    if (user.role !== requestedRole) {
      return res.status(403).json({ code: "ROLE_MISMATCH" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    logger.error("authController - login error: " + error.message);
    return res.status(500).json({ code: "SERVER_ERROR" });
  }
};

module.exports = {
  login,
};
