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
  VALUES (1, 'Razbutbul');


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
    stock INT DEFAULT 0,
    author_id INT,
    publisher_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (publisher_id) REFERENCES publishers(id)
  );

  INSERT INTO books (title, price, stock, author_id, publisher_id)
  VALUES ('How to be a great programmer', 59.90, 12, 1, 1);

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