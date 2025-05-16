import React, { useState } from "react";
import NavBar from "../common/NavBar";
import BookList from "../common/BookList";

const AdminDashboard = () => {
  const [showBooks, setShowBooks] = useState(false);

  const handleToggleBooks = () => {
    setShowBooks((prev) => !prev);
  };

  return (
    <>
      <NavBar
        role="admin"
        title="Admin Dashboard"
        onShowBooks={handleToggleBooks}
      >
        {showBooks && <BookList />}
      </NavBar>
    </>
  );
};

export default AdminDashboard;
