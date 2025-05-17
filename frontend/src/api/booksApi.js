import { BASE_URL } from "./apiConfig";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchAllBooks = async () => {
  const response = await fetch(`${BASE_URL}/books`);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return await response.json();
};

export const addABook = async (bookData) => {
  const response = await fetch(`${BASE_URL}/books/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error("Failed to add book");
  }

  return await response.json();
};

export const deleteBook = async (bookId) => {
  const response = await fetch(`${BASE_URL}/books/${bookId}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }

  return await response.json();
};

export const bookPurchase = async (purchaseData) => {
  const response = await fetch(`${BASE_URL}/books/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(purchaseData),
  });

  if (!response.ok) {
    throw new Error("Failed to buy a book");
  }

  return await response.json();
};

export const getBooksByUserId = async () => {
  const response = await fetch(`${BASE_URL}/books/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books for this user");
  }

  return await response.json();
};

export const updateBook = async (bookId, updatedData) => {
  const response = await fetch(`${BASE_URL}/books/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Failed to update book");
  }

  return await response.json();
};
