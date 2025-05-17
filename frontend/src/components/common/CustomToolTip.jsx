import React from "react";
import { Tooltip, useTheme } from "@mui/material";

const CustomTooltip = ({ title, children, disable = true }) => {
  const theme = useTheme();

  return (
    <Tooltip
      title={title}
      disableHoverListener={disable}
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
