import { useState } from "react";
import { Button, Box } from "@mui/material";
import LoginDialog from "./LoginDialog";
import "./Login.css";

function Login() {
  const [role, setRole] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (selectedRole) => {
    setRole(selectedRole);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleExited = () => {
    setRole(null);
  };

  return (
    <div className="home-container">
      <h1>Login to Raz Butbul's BookShop</h1>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        mt={3}
      >
        <Button
          variant="outlined"
          color="success"
          sx={{ width: "200px", color: "#0e4d45" }}
          onClick={() => handleOpenDialog("user")}
        >
          Login as User
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          sx={{
            width: "200px",
            color: "#4b2e39",
          }}
          onClick={() => handleOpenDialog("admin")}
        >
          Login as Admin
        </Button>
      </Box>
      <LoginDialog
        open={openDialog}
        role={role}
        onClose={handleClose}
        onExited={handleExited}
      />
    </div>
  );
}

export default Login;
