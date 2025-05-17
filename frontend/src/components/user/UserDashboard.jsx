import React, { useState } from "react";
import NavBar from "../common/NavBar";
import BookList from "../common/BookList";
import RecentPurchases from "./RecentPurchases";

const UserDashboard = () => {
  const [showBooks, setShowBooks] = useState(true);
  const [openPurchases, setOpenPurchases] = useState(false);

  const handleToggleBooks = () => {
    setShowBooks((prev) => !prev);
  };

  const handleShowMyPurchases = () => {
    setOpenPurchases(true);
  };

  const handleClosePurchases = () => {
    setOpenPurchases(false);
  };

  return (
    <>
      <NavBar
        onShowBooks={handleToggleBooks}
        isLoggedIn
        onShowMyPurchases={handleShowMyPurchases}
        recentPurchases="My Recent Purchases"
      >
        {showBooks && <BookList />}
      </NavBar>
      <RecentPurchases open={openPurchases} onClose={handleClosePurchases} />
    </>
  );
};

export default UserDashboard;
