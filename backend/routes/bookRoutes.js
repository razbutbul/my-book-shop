const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getBooks);
router.post("/add", bookController.addBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
