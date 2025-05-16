import React, { useState } from "react";
import NavBar from "../common/NavBar";
import BookList from "../common/BookList";

const UserDashboard = () => {
  const [showBooks, setShowBooks] = useState(false);

  const handleToggleBooks = () => {
    setShowBooks((prev) => !prev);
  };

  return (
    <NavBar role="user" onShowBooks={handleToggleBooks}>
      {showBooks && <BookList />}
    </NavBar>
  );
};

export default UserDashboard;
