const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const userController = require("../controllers/userController");

router.get("/", authenticateUser, authorizeAdmin, userController.getAllUsers);

module.exports = router;
