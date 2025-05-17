const db = require("./db");
const logger = require("../logger");

const getAllBooks = async () => {
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
};

const findAuthorByName = async (name) => {
  const [rows] = await db.query(`SELECT id FROM authors WHERE name = ?`, [
    name,
  ]);
  return rows[0] || null;
};

const createAuthor = async (name) => {
  const [result] = await db.query(`INSERT INTO authors (name) VALUES (?)`, [
    name,
  ]);
  return result.insertId;
};

const findPublisherByName = async (name) => {
  const [rows] = await db.query(`SELECT id FROM publishers WHERE name = ?`, [
    name,
  ]);
  return rows[0] || null;
};

const createPublisher = async (name) => {
  const [result] = await db.query(`INSERT INTO publishers (name) VALUES (?)`, [
    name,
  ]);
  return result.insertId;
};

const insertBook = async ({
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
};

const deleteBookById = async (bookId) => {
  const [result] = await db.query(`DELETE FROM books WHERE id = ?`, [bookId]);
  return result.affectedRows > 0;
};

const updateAPurchase = async ({
  userId,
  bookId,
  quantity,
  purchasePrice,
  address,
  phone,
}) => {
  const query = `
    INSERT INTO purchases (user_id, book_id, quantity, total_price, delivery_adress, phone_number)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [userId, bookId, quantity, purchasePrice, address, phone];
  await db.query(query, params);

  logger.info(
    `updateAPurchase - Purchase inserted: userId=${userId}, bookId=${bookId}, quantity=${quantity}`
  );
};

const updateBooks = async ({ bookId, quantity }) => {
  const query = `
    UPDATE books
    SET stock = stock - ?
    WHERE id = ? AND stock >= ?`;
  const [result] = await db.execute(query, [quantity, bookId, quantity]);

  if (result.affectedRows === 0) {
    logger.error("Not enough stock or book not found");
  }

  logger.info(`Stock updated successfully for book ID: ${bookId}`);
  return result;
};

const getUserPurchases = async (userId) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        b.title AS book_title,
        a.name AS author_name,
        p.quantity,
        p.purchased_at,
        p.total_price
      FROM purchases p
      JOIN books b ON p.book_id = b.id
      JOIN authors a ON b.author_id = a.id
      WHERE p.user_id = ?
      ORDER BY p.purchased_at DESC
      `,
      [userId]
    );

    logger.info(
      `getUserPurchases - Found ${rows.length} purchases for userId=${userId}`
    );
    return rows;
  } catch (error) {
    logger.error("getUserPurchases - Error: " + error.message);
    throw error;
  }
};

const updateBookById = async (
  bookId,
  { title, price, book_description, stock, author_id, publisher_id }
) => {
  try {
    const [result] = await db.query(
      `UPDATE books 
       SET title = ?, price = ?, book_description = ?,
           stock = ?, author_id = ?, publisher_id = ?,
           updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [title, price, book_description, stock, author_id, publisher_id, bookId]
    );

    logger.info(`updateBookById - Book ID ${bookId} updated.`);
    return result.affectedRows > 0;
  } catch (error) {
    logger.error("updateBookById - Error: " + error.message);
    throw error;
  }
};

module.exports = {
  getAllBooks,
  findAuthorByName,
  createAuthor,
  findPublisherByName,
  createPublisher,
  insertBook,
  deleteBookById,
  updateAPurchase,
  updateBooks,
  getUserPurchases,
  updateBookById,
};
