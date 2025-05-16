  USE bookshop;
  DROP TABLE IF EXISTS books;
  DROP TABLE IF EXISTS authors;
  DROP TABLE IF EXISTS publishers;
  DROP TABLE IF EXISTS users;


  CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

 INSERT INTO authors (id, name)
VALUES 
  (1, 'George Orwell'),(2, 'Frank Herbert'),(3, 'Stephen King'),(4, 'William Shakespeare'),(5, 'Bram Stoker'),
  (6, 'Mary Shelley'),(7, 'Roald Dahl'),(8, 'Jane Austen'),(9, 'Toni Morrison'),(10, 'Hermann Hesse');


  CREATE TABLE publishers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );

  INSERT INTO publishers (id, name)
  VALUES (1, 'Razbutbul Publishing');


  CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    book_description  TEXT
    stock INT DEFAULT 0,
    author_id INT,
    publisher_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (publisher_id) REFERENCES publishers(id)
  );

INSERT INTO books (title, price, book_description, stock, author_id, publisher_id)
VALUES 
  ('1984', 30.60, 'A man lives in a world with no freedom.', 12, 1, 1),
  ('Dune', 49.90, 'A boy travels to a desert planet to save his people.', 12, 2, 1),
  ('It', 19.90, 'A scary clown comes back to hurt kids.', 12, 3, 1),
  ('Hamlet', 29.90, 'A prince wants to know who killed his father.', 12, 4, 1),
  ('Dracula', 89.90, 'A man drinks blood and lives in a dark castle.', 12, 5, 1),
  ('Frankenstein', 59.90, 'A doctor makes a monster from body parts.', 12, 6, 1),
  ('Matilda', 69.90, 'A smart girl has powers and loves books.', 12, 7, 1),
  ('Emma', 69.90, 'A young woman tries to find love for others.', 12, 8, 1),
  ('Beloved', 59.90, 'A woman is haunted by a painful past.', 12, 9, 1),
  ('Siddhartha', 59.90, 'A man looks for peace and truth in life.', 12, 10, 1);


  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

  INSERT INTO users (username, email, password, role)
  VALUES ('AdminUser', 'admin@gmail.com', '$2a$12$sml6/PIuKDFg8Mimq2uwMeGbxetfOdLk85nJQT1tHKBdrW.jai3Dq', 'admin'),
         ('User', 'user@gmail.com', '$2a$12$sml6/PIuKDFg8Mimq2uwMeGbxetfOdLk85nJQT1tHKBdrW.jai3Dq', 'user');