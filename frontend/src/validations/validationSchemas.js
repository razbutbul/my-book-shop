import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  requestedRole: yup
    .string()
    .oneOf(["admin", "user"], "Role must be either 'admin' or 'user'")
    .required("Role is required"),
});

export const createBookSchema = yup.object().shape({
  title: yup
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100)
    .required("Title is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  book_description: yup
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(1000)
    .required("Description is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  author_name: yup
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(100)
    .required("Author name is required"),
  publisher_name: yup
    .string()
    .min(2, "Publisher name must be at least 2 characters")
    .max(100)
    .required("Publisher name is required"),
});

export const createPurchaseSchema = yup.object().shape({
  bookId: yup
    .number()
    .typeError("Book ID must be a number")
    .integer()
    .positive("Book ID must be a positive number")
    .required("Book ID is required"),
  phone: yup
    .string()
    .matches(/^0\d{9}$/, "Phone number must be 10 digits and start with 0")
    .required("Phone number is required"),
  address: yup
    .string()
    .min(3, "Address must be at least 3 characters")
    .max(255)
    .required("Address is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .integer("Quantity must be an integer")
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  purchasePrice: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Purchase price is required"),
});
