export const fetchAllBooks = async () => {
  const response = await fetch("http://localhost:3000/api/books");

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return await response.json();
};
