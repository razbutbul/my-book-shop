import { useEffect, useState } from "react";
import { fetchAllBooks } from "../../api/booksApi";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
  Pagination,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./BookList.css";

const BookList = () => {
  const theme = useTheme();
  const [books, setBooks] = useState([]);
  const role = localStorage.getItem("role");
  const roleColor = theme.palette[role]?.main || "primary";
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  useEffect(() => {
    fetchAllBooks().then(setBooks).catch(console.error);
  }, []);

  const getCurrentBooks = () => {
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    return books.slice(indexOfFirstBook, indexOfLastBook);
  };

  const currentBooks = getCurrentBooks();
  const pageCount = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box mb={3} px={3} display="flex" justifyContent="end">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          className="custom-pagination"
          sx={{ "--pagination-color": roleColor }}
        />
      </Box>

      <div className="book-list-container">
        {currentBooks.map((book) => (
          <div className="book-card-wrapper" key={book.id}>
            <Card className="book-card">
              <CardMedia
                component="img"
                height="180"
                image={"/images/genericBook.png"}
                alt={book.title}
                className="book-cover"
              />

              <CardContent>
                <Typography variant="h6" color={roleColor}>
                  {book.title}
                </Typography>
                <Typography variant="body2" color={roleColor}>
                  {book?.author}
                </Typography>
              </CardContent>

              <CardActions>
                {role === "admin" ? (
                  <>
                    <Button size="small" color="primary" variant="outlined">
                      Edit
                    </Button>
                    <Button size="small" color="error" variant="outlined">
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button size="small" color="success" variant="outlined">
                    Buy
                  </Button>
                )}
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookList;
