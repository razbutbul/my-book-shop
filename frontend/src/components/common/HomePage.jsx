import React, { useState } from "react";
import NavBar from "./NavBar";
import BookList from "./BookList";

const HomePage = () => {
  const [showBooks, setShowBooks] = useState(true);
  localStorage.setItem("role", "user");

  const handleToggleBooks = () => {
    setShowBooks((prev) => !prev);
  };

  return (
    <NavBar
      isLoggedIn={false}
      onShowBooks={handleToggleBooks}
      NavBarTitle={"Hello Anonymous user"}
    >
      {showBooks && <BookList />}

      <div style={{ marginTop: 20 }}></div>
    </NavBar>
  );
};

export default HomePage;
