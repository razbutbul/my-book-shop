const db = require("./db");
const logger = require("../logger");

const getUserByEmail = async (email) => {
  try {
    const [rows] = await db.query(
      "SELECT id, userName, email, role, password FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  } catch (error) {
    logger.error("authDAL - Error fetching user by email: " + error.message);
    throw error;
  }
};

module.exports = {
  getUserByEmail,
};
