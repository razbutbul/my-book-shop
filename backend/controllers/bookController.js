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
    const fields = [
      title,
      price,
      book_description,
      stock,
      author_name,
      publisher_name,
    ];

    if (fields.some((field) => !field)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const author = await bookDAL.findAuthorByName(author_name);
    let author_id = author
      ? author.id
      : await bookDAL.createAuthor(author_name);

    const publisher = await bookDAL.findPublisherByName(publisher_name);
    let publisher_id = publisher
      ? publisher.id
      : await bookDAL.createPublisher(publisher_name);

    const newBook = await bookDAL.insertBook({
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

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await bookDAL.deleteBookById(id);

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
  deleteBook,
};
