const db = require("./db");
const logger = require("../logger");

const authDAL = {
  getUserByEmail: async (email) => {
    try {
      const [rows] = await db.query(
        "SELECT userName, email, role, password FROM users WHERE email = ?",
        [email]
      );
      return rows[0];
    } catch (error) {
      logger.error("authDAL - Error fetching user by email: " + error.message);
      throw error;
    }
  },
};

module.exports = authDAL;
