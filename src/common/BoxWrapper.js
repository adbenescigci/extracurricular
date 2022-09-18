import React from "react";
import Box from "@mui/material/Box";

const boxWrapperStyles = {
  maxWidth: "1277px",
  margin: "auto",
  minHeight: "calc(100vh)",
};

const BoxWrapper = ({ children }) => {
  return (
    <Box justifyContent="center" xs={12} sx={boxWrapperStyles}>
      {children}
    </Box>
  );
};

export default BoxWrapper;
