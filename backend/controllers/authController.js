const { getUserByEmail } = require("../dal/authDAL");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../logger");

const login = async (req, res) => {
  const { email, password, requestedRole } = req.body;

  try {
    const user = await getUserByEmail(email);
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

    logger.info(
      `User with ID=${user.id} successfully logged in with role=${user.role}`
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        userName: user.userName,
      },
    });
  } catch (error) {
    logger.error("authController - login error: " + error.message);
    return res.status(500).json({ code: "SERVER_ERROR" });
  }
};

module.exports = {
  login,
};
