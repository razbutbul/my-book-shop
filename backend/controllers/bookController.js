const bookDAL = require("../dal/bookDAL");

const getBooks = async (req, res) => {
  try {
    const books = await bookDAL.getAllBooks();
    res.json(books);
  } catch (error) {
    logger.error("getBooks - error in getBooks: " + error.message);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

module.exports = {
  getBooks,
};
