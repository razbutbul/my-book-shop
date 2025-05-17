import React, { useEffect, useState } from "react";
import { getBooksByUserId } from "../../api/booksApi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

const RecentPurchases = ({ open, onClose }) => {
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        const books = await getBooksByUserId();
        setPurchasedBooks(books);
      } catch (err) {
        console.error("Failed to fetch user purchases:", err);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchPurchasedBooks();
    }
  }, [open]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Your Recent Purchases</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : purchasedBooks.length === 0 ? (
          <Typography variant="body1" align="center" mt={2}>
            You haven't purchased any books yet.
          </Typography>
        ) : (
          <List>
            {purchasedBooks.map((book, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${book.book_title} by ${book.author_name}`}
                  secondary={`Quantity: ${
                    book.quantity
                  } | Total Paid: $${Number(book.total_price).toFixed(
                    2
                  )} | Purchased on: ${formatDate(book.purchased_at)}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecentPurchases;
