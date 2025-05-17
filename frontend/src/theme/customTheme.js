import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    admin: {
      main: "#4b2e39",
      contrastText: "white",
    },
    user: {
      main: "#0e4d45",
      contrastText: "white",
    },
    disabled: {
      main: "#ccc",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: "bold",
          padding: "8px 24px",
          textTransform: "none",
        },
      },
    },
  },
});

export default customTheme;
