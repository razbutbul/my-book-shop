import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPurchaseSchema } from "../../validations/validationSchemas";
import { bookPurchase } from "../../api/booksApi";

const PurchaseDialog = ({ open, onClose, book, onPurchaseSuccess }) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createPurchaseSchema),
    defaultValues: {
      phone: "",
      address: "",
      quantity: 1,
      bookId: book?.id ?? 0,
      purchasePrice: 0,
    },
    mode: "onChange",
  });

  const quantityRaw = watch("quantity");
  const quantity = Number(quantityRaw) || 0;
  const bookStock = book?.stock ?? 0;
  const price = Number(book?.price) || 0;
  const totalPrice = quantity * price;
  const userQuantityRequested = quantity > bookStock;

  useEffect(() => {
    if (book) {
      setValue("bookId", book.id);
      setValue("purchasePrice", totalPrice);
    }
  }, [book, quantity, setValue]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setValue("quantity", "", { shouldValidate: true });
    } else {
      const num = Number(value);
      if (!isNaN(num)) {
        setValue("quantity", num, { shouldValidate: true });
      }
    }
  };

  const handleQuantityBlur = () => {
    const current = getValues("quantity");
    if (!current || current < 1) {
      setValue("quantity", 1, { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    await bookPurchase(data);
    reset();
    onClose();
    if (onPurchaseSuccess) {
      onPurchaseSuccess();
    }
  };

  if (!book) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>Complete Your Purchase</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please provide your details to purchase{" "}
            <strong>{book.title}</strong>
          </DialogContentText>

          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Phone Number"
              placeholder="052-1234567"
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />

            <TextField
              label="Address"
              placeholder="Your delivery address"
              fullWidth
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />

            <TextField
              label="Quantity"
              type="number"
              fullWidth
              inputProps={{ min: 1 }}
              {...register("quantity", { valueAsNumber: true })}
              value={quantityRaw}
              onChange={handleQuantityChange}
              onBlur={handleQuantityBlur}
              error={!!errors.quantity || userQuantityRequested}
              helperText={
                userQuantityRequested
                  ? `Only ${bookStock} in stock`
                  : errors.quantity?.message
              }
            />

            <Typography variant="h6">
              Total: ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={userQuantityRequested}
            sx={{
              backgroundColor: theme.palette.user.main,
              "&.Mui-disabled": {
                backgroundColor: theme.palette.disabled.main,
                color: theme.palette.disabled.contrastText,
              },
            }}
          >
            Confirm Purchase
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default PurchaseDialog;
