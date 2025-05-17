import React, { useState } from "react";
import NavBar from "../common/NavBar";
import BookList from "../common/BookList";
import AddBookDialog from "./AddBookDialog";

const AdminDashboard = () => {
  const [showBooks, setShowBooks] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [refreshBooks, setRefreshBooks] = useState(false);

  const handleToggleBooks = () => {
    setShowBooks((prev) => !prev);
  };

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleBookAdded = () => {
    setShowBooks(true);
    setRefreshBooks((prev) => !prev);
  };

  return (
    <>
      <NavBar
        addABook={"Add books"}
        onShowBooks={handleToggleBooks}
        onAddBookClick={handleOpenAddDialog}
        isLoggedIn
      >
        {showBooks && <BookList refreshTrigger={refreshBooks} />}
      </NavBar>

      <AddBookDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        onBookAdded={handleBookAdded}
      />
    </>
  );
};

export default AdminDashboard;
