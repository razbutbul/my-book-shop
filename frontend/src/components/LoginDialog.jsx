import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { isAdmin } from "./login-utils";
import LoginForm from "./LoginForm";

const LoginDialog = ({ open, role, onClose, onExited }) => {
  const roleColor = isAdmin(role) ? "admin.main" : "user.main";

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, color: roleColor, fontWeight: "bold" }}>
        Login as {isAdmin(role) ? "Admin" : "User"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {role && <LoginForm role={role} />}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
