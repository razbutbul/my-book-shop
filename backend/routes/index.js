const express = require("express");
const router = express.Router();

const bookRoutes = require("./bookRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
