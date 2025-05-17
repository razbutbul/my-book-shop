This project was developed as part of a home assignment for a Fullstack Developer role.

# My Book Shop

This is a fullstack project simulating an online book shop system with two main client-side views: one for regular users and one for admins.

## Shared Functionality

All users (admin, user, or guest) can:

- View the full list of books available in the shop.
- Use a search field to filter books by name.

## User View

After logging in, a user can:

1. Purchase a book by selecting the desired quantity (limited by available stock).
2. View a list of books they have purchased in the past.

## Admin View

After logging in, an admin can:

1. Edit or delete existing books.
2. Add new books, including all required details.

## Guest Mode (Before Login)

- Guests (not logged in) can view the list of books and use the search field.
- Guests cannot purchase books.

## Setup Instructions

## Tech Stack

- **Client**: React (with Vite)
- **Server**: Node.js (Express)
- **Database**: MySQL
- **Authentication**: JWT
- **Validation**:
  - Frontend: Yup
  - Backend: Joi
- **Testing**: Jest

## Main Libraries and Tools

# Backend:

- `winston` – Structured logging
- `jsonwebtoken` – JWT-based authentication
- `bcrypt` – Password hashing
- `joi` – Input validation
- `dotenv` – Environment variable management
- `jest` – Unit testing

# Frontend:

- `react-router-dom` – Routing
- `@mui/material` – Material UI component library
- `react-hook-form` – Form handling
- `@hookform/resolvers` + `yup` – Form validation

## Setup Instructions

1. Clone the repository and install dependencies
   Clone the repository to your local machine.

Open two terminal windows:

In the first terminal, navigate to the backend folder and run npm install.

In the second terminal, navigate to the frontend folder and run npm install.

2. Configure environment variables
   Create a .env file in the backend directory using the .env.example file as a template.

Fill in the missing values such as your MySQL credentials.

3. Initialize the database
   Run the SQL dump file located at backend/db/bookshop_sturcture_db.sql

mysql -u root -p < backend/db/bookshop_sturcture_db.sql

This will create the book_shop database and the necessary tables.

4. Start the project
   In the backend folder, run the server using node server.js.

In the frontend folder, start using npm run dev.

5. Run tests if necessary
   To run backend tests, navigate to the backend folder and run - npm test.
