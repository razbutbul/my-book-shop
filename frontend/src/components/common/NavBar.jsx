import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";
import { Logout } from "../login-utils";
const NavBar = ({
  addABook,
  children,
  onShowBooks,
  onShowMyPurchases,
  recentPurchases,
  onAddBookClick,
  isLoggedIn,
  NavBarTitle,
}) => {
  const role = localStorage.getItem("role");
  const navBarColor = `${role}.main`;
  const userName = localStorage.getItem("userName");
  const title = NavBarTitle ?? `Hello ${userName}`;

  const handleLogout = () => {
    Logout();
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleAuthClick = () => {
    isLoggedIn ? handleLogout() : handleLogin();
  };

  const authButtonText = isLoggedIn ? "Log out" : "Log in";

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: navBarColor }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {role === "admin" && (
            <Button color="white" onClick={onAddBookClick}>
              {addABook}
            </Button>
          )}
          {role === "user" && (
            <Button color="white" onClick={onShowMyPurchases}>
              {recentPurchases}
            </Button>
          )}
          <Button color="white" onClick={onShowBooks}>
            All books
          </Button>
          <Button color="white" onClick={handleAuthClick}>
            {authButtonText}
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default NavBar;
