const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const bookController = require("../controllers/bookController");

router.get("/", bookController.getBooks);
router.post("/add", authenticateUser, authorizeAdmin, bookController.addBook);
router.delete(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  bookController.deleteBook
);

module.exports = router;
