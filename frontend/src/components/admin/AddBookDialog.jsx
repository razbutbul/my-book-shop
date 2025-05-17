import React, { useState, useEffect } from "react";
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
import { addABook, updateBook } from "../../api/booksApi";

const AddBookDialog = ({ open, onClose, onBookAdded, initialBookData }) => {
  const theme = useTheme();
  const adminColor = theme.palette.admin?.main || theme.palette.primary.main;
  const isEditMode = Boolean(initialBookData);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
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

  useEffect(() => {
    if (isEditMode && initialBookData) {
      const { id, created_at, updated_at, ...editableFields } = initialBookData;
      Object.entries(editableFields).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      reset();
    }
  }, [initialBookData, isEditMode, setValue, reset]);

  const onSubmit = async () => {
    setServerError("");
    try {
      const data = getValues();

      if (isEditMode) {
        const { id, created_at, updated_at, ...cleanedData } = data;
        await updateBook(initialBookData.id, cleanedData);
      } else {
        await addABook(data);
      }

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
        {isEditMode ? "Edit Book" : "Add New Book"}
      </DialogTitle>

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
            {isEditMode ? "Save Changes" : "Add"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddBookDialog;
