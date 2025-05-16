import { BASE_URL } from "./apiConfig";
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
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }

  return await response.json();
};
