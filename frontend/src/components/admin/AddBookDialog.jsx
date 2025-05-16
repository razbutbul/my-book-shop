import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { addABook } from "../../api/booksApi";

const AddBookDialog = ({ open, onClose, onBookAdded }) => {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    book_description: "",
    stock: "",
    author_name: "",
    publisher_name: "",
  });
  const adminColor = theme.palette.admin?.main || theme.palette.primary.main;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    try {
      await addABook(formData);
      onBookAdded();
      onClose();
    } catch (err) {
      const errorMsg = err?.message || "Something went wrong";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: adminColor, fontWeight: "bold" }}>
        Add New Book
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <TextField
            name="book_description"
            label="Description"
            value={formData.book_description}
            onChange={handleChange}
          />
          <TextField
            name="stock"
            label="Stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
          <TextField
            name="author_name"
            label="Author Name"
            value={formData.author_name}
            onChange={handleChange}
          />
          <TextField
            name="publisher_name"
            label="Publisher Name"
            value={formData.publisher_name}
            onChange={handleChange}
          />
        </Box>

        {errorMessage && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="text" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="text" color="success" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookDialog;
