const db = require("./db");
const logger = require("../logger");

const bookDAL = {
  getAllBooks: async () => {
    try {
      const [rows] = await db.query(`
      SELECT 
        books.id,
        books.title,
        books.price,
        books.stock,
        books.created_at,
        books.updated_at,
        authors.name AS author_name,
        publishers.name AS publisher_name
      FROM books
      LEFT JOIN authors ON books.author_id = authors.id
      LEFT JOIN publishers ON books.publisher_id = publishers.id
    `);
      return rows;
    } catch (error) {
      logger.error(
        "getAllBooks - Error while trying to fetch books: " + error.message
      );
      throw error;
    }
  },
};

module.exports = bookDAL;
