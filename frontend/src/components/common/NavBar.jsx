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

const NavBar = ({ role, title, children, onShowBooks }) => {
  const navBarColor = `${role}.main`;

  const handleLogout = () => {
    Logout();
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: navBarColor,
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <Button color="white" onClick={onShowBooks}>
            All books
          </Button>

          <Button color="white" onClick={handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};

export default NavBar;
