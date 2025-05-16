import React, { useState } from "react";
import NavBar from "../common/NavBar";
import BookList from "../common/BookList";
import AddBookDialog from "./AddBookDialog";

const AdminDashboard = () => {
  const [showBooks, setShowBooks] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleToggleBooks = () => {
    setShowBooks((prev) => !prev);
  };

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);

  const handleBookAdded = () => {
    setShowBooks(true);
  };

  return (
    <>
      <NavBar
        role="admin"
        addABook={"Add books"}
        onShowBooks={handleToggleBooks}
        onAddBookClick={handleOpenAddDialog}
      >
        {showBooks && <BookList />}
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
