const {
  getAllBooks,
  findAuthorByName,
  createAuthor,
  findPublisherByName,
  createPublisher,
  insertBook,
  deleteBookById,
  updateAPurchase,
  updateBooks,
} = require("../dal/bookDAL");
const logger = require("../logger");

const getBooks = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    logger.error("getBooks - error in getBooks: " + error.message);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

const addBook = async (req, res) => {
  try {
    const {
      title,
      price,
      book_description,
      stock,
      author_name,
      publisher_name,
    } = req.body;

    const author = await findAuthorByName(author_name);
    const author_id = author ? author.id : await createAuthor(author_name);

    const publisher = await findPublisherByName(publisher_name);
    const publisher_id = publisher
      ? publisher.id
      : await createPublisher(publisher_name);

    const newBook = await insertBook({
      title,
      price,
      book_description,
      stock,
      author_id,
      publisher_id,
    });

    res.status(201).json(newBook);
  } catch (error) {
    logger.error("addBook - error in addBook: " + error.message);
    res.status(500).json({ error: "Failed to add book" });
  }
};

const bookPurchase = async (req, res) => {
  try {
    const { bookId, quantity, purchasePrice, address, phone } = req.body;
    const userId = req.user.userId;
    logger.info("Calling updateAPurchase");

    await updateAPurchase({
      userId,
      bookId,
      quantity,
      purchasePrice,
      address,
      phone,
    });

    await updateBooks({ bookId, quantity });
    logger.info(
      `Purchase successful: user ${userId} bought book ${bookId} x${quantity}`
    );
    res.status(201).json({ message: "Purchase successful" });
  } catch (error) {
    logger.error("Error in bookPurchase:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteBookById(id);

    if (!deleted) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    logger.error("deleteBook - error in deleteBook: " + error.message);
    res.status(500).json({ error: "Failed to delete book" });
  }
};

module.exports = {
  getBooks,
  addBook,
  bookPurchase,
  deleteBook,
};
