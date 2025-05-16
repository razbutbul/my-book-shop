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
          books.book_description,
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
      logger.error("getAllBooks - Error: " + error.message);
      throw error;
    }
  },

  findAuthorByName: async (name) => {
    const [rows] = await db.query(`SELECT id FROM authors WHERE name = ?`, [
      name,
    ]);
    return rows[0] || null;
  },

  createAuthor: async (name) => {
    const [result] = await db.query(`INSERT INTO authors (name) VALUES (?)`, [
      name,
    ]);
    return result.insertId;
  },

  findPublisherByName: async (name) => {
    const [rows] = await db.query(`SELECT id FROM publishers WHERE name = ?`, [
      name,
    ]);
    return rows[0] || null;
  },

  createPublisher: async (name) => {
    const [result] = await db.query(
      `INSERT INTO publishers (name) VALUES (?)`,
      [name]
    );
    return result.insertId;
  },

  insertBook: async ({
    title,
    price,
    book_description,
    stock,
    author_id,
    publisher_id,
  }) => {
    const [result] = await db.query(
      `INSERT INTO books (title, price, book_description, stock, author_id, publisher_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, price, book_description, stock, author_id, publisher_id]
    );

    logger.info(`insertBook - New book added with ID: ${result.insertId}`);

    return {
      id: result.insertId,
      title,
      price,
      book_description,
      stock,
      author_id,
      publisher_id,
    };
  },
  deleteBookById: async (bookId) => {
    const [result] = await db.query(`DELETE FROM books WHERE id = ?`, [bookId]);
    return result.affectedRows > 0;
  },
};

module.exports = bookDAL;
