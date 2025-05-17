const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const validate = require("../middlewares/validate");
const bookController = require("../controllers/bookController");
const { createPurchaseSchema } = require("../validations/purchaseValidation");
const {
  createBookSchema,
  idParamSchema,
} = require("../validations/bookValidation");

router.get("/", bookController.getBooks);
router.post(
  "/add",
  authenticateUser,
  authorizeAdmin,
  validate(createBookSchema),
  bookController.addBook
);
router.post(
  "/purchase",
  authenticateUser,
  validate(createPurchaseSchema),
  bookController.bookPurchase
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  validate(idParamSchema),
  bookController.deleteBook
);

module.exports = router;
