import React, { useState } from "react";
import NavBar from "../common/NavBar";
import BookList from "../common/BookList";

const UserDashboard = () => {
  const [showBooks, setShowBooks] = useState(true);

  const handleToggleBooks = () => {
    setShowBooks((prev) => !prev);
  };

  return (
    <NavBar onShowBooks={handleToggleBooks} isLoggedIn>
      {showBooks && <BookList />}
    </NavBar>
  );
};

export default UserDashboard;
