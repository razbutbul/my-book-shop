import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import BookList from "./BookList";

const HomePage = () => {
  const [showBooks, setShowBooks] = useState(true);
  localStorage.setItem("role", "user");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
    }
  }, []);

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
