import React from "react";
import { Tooltip, useTheme } from "@mui/material";

const CustomTooltip = ({ title, children, isLoggedIn }) => {
  const theme = useTheme();

  if (isLoggedIn) {
    return children;
  }

  return (
    <Tooltip
      title={title}
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: theme.palette.user.main,
            color: "white",
            fontSize: "1rem",
            padding: "8px 12px",
            borderRadius: "8px",
          },
        },
      }}
    >
      <span>{children}</span>
    </Tooltip>
  );
};

export default CustomTooltip;
