import { useEffect, useState } from "react";
import { fetchAllBooks, deleteBook } from "../../api/booksApi";
import SearchField from "../common/SearchField";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
  Pagination,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PurchaseDialog from "../user/PurchaseDialog";
import "./BookList.css";
import CustomTooltip from "../common/CustomToolTip";

const BookList = ({ refreshTrigger, onEditBook }) => {
  const theme = useTheme();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const role = localStorage.getItem("role");
  const roleColor = theme.palette[role]?.main || "primary";
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const booksPerPage = 8;
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
  }, [refreshTrigger]);

  const handleOpenPurchaseDialog = (book) => {
    setSelectedBook(book);
    setOpenPurchaseDialog(true);
  };

  const handleClosePurchaseDialog = () => {
    setSelectedBook(null);
    setOpenPurchaseDialog(false);
  };

  const handleOpenConfirmDialog = (bookId) => {
    setSelectedBookId(bookId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBook(selectedBookId);
      await fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err.message);
    } finally {
      handleCloseDialog();
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBookId(null);
  };

  const fetchBooks = async () => {
    try {
      const data = await fetchAllBooks();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books:", err.message);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCurrentBooks = () => {
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    return filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  };

  const currentBooks = getCurrentBooks();
  const pageCount = Math.ceil(filteredBooks.length / booksPerPage);

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
      <SearchField searchTerm={searchTerm} onSearch={setSearchTerm} />
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
                  {book.author_name}
                </Typography>
                <Typography variant="body2" color={roleColor}>
                  $ {book.price}
                </Typography>
              </CardContent>

              <CardActions>
                {role === "admin" ? (
                  <>
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => onEditBook(book)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => handleOpenConfirmDialog(book.id)}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <CustomTooltip
                    title="You must be logged in to purchase a book"
                    isLoggedIn={isLoggedIn}
                  >
                    <Button
                      disabled={!isLoggedIn}
                      sx={{
                        backgroundColor: isLoggedIn
                          ? theme.palette.user.main
                          : "white",
                        color: "white",
                      }}
                      variant="outlined"
                      onClick={() => handleOpenPurchaseDialog(book)}
                    >
                      Buy
                    </Button>
                  </CustomTooltip>
                )}
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will permanently delete the book.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <PurchaseDialog
        open={openPurchaseDialog}
        onClose={handleClosePurchaseDialog}
        book={selectedBook}
        onPurchaseSuccess={fetchBooks}
      />
    </>
  );
};

export default BookList;
