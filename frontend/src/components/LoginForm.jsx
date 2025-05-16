import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isAdmin, getRoleColor } from "./login-utils";

const errorMessages = {
  INVALID_CREDENTIALS: "Email or password is incorrect.",
  ROLE_MISMATCH: "You are not allowed to login as this role.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
};

const LoginForm = ({ role }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const isAdminRole = isAdmin(role);

  const onSubmit = async (data) => {
    setServerError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          requestedRole: role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = errorMessages[result.code] || "Login failed";
        setServerError(message);
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.user.role);

      if (result.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/shop");
      }
    } catch (err) {
      setServerError("Network error or server unavailable.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      {serverError && (
        <Typography color="error" sx={{ mt: 1 }}>
          {serverError}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        color={getRoleColor(role)}
        fullWidth
        sx={{ mt: 2 }}
      >
        Login as {role}
      </Button>
    </Box>
  );
};

export default LoginForm;
