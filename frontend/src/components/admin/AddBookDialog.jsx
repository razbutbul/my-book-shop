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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBookSchema } from "../../validations/validationSchemas";
import { addABook } from "../../api/booksApi";

const AddBookDialog = ({ open, onClose, onBookAdded }) => {
  const theme = useTheme();
  const adminColor = theme.palette.admin?.main || theme.palette.primary.main;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createBookSchema),
    defaultValues: {
      title: "",
      price: "",
      book_description: "",
      stock: "",
      author_name: "",
      publisher_name: "",
    },
    mode: "onChange",
  });

  const [serverError, setServerError] = useState("");

  const onSubmit = async (formData) => {
    setServerError("");
    try {
      await addABook(formData);
      onBookAdded();
      reset();
      onClose();
    } catch (err) {
      const errorMsg = err?.message || "Something went wrong";
      setServerError(errorMsg);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: adminColor, fontWeight: "bold" }}>
        Add New Book
      </DialogTitle>

      {/* הטופס מתחיל כאן */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Title"
              fullWidth
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              {...register("price")}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              label="Description"
              fullWidth
              {...register("book_description")}
              error={!!errors.book_description}
              helperText={errors.book_description?.message}
            />
            <TextField
              label="Stock"
              type="number"
              fullWidth
              {...register("stock")}
              error={!!errors.stock}
              helperText={errors.stock?.message}
            />
            <TextField
              label="Author Name"
              fullWidth
              {...register("author_name")}
              error={!!errors.author_name}
              helperText={errors.author_name?.message}
            />
            <TextField
              label="Publisher Name"
              fullWidth
              {...register("publisher_name")}
              error={!!errors.publisher_name}
              helperText={errors.publisher_name?.message}
            />
            {serverError && (
              <Typography color="error" sx={{ mt: 1 }}>
                {serverError}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            variant="text"
            color="error"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button variant="text" color="success" type="submit">
            Add
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddBookDialog;
