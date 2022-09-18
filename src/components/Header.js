import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { logout } from "../providers/Redux/slices/authSlice";

const Header = ({ user }) => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ position: "sticky" }}>
        <Toolbar
          sx={{ bgcolor: "white ! important", justifyContent: "space-between" }}
        >
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              cursor: "pointer",
              paddingRight: 1,
              maxWidth: "fit-content",
              fontWeight: "bold",
              "&>span": {
                color: "#A2DA4A",
                fontStyle: "italic",
              },
            }}
          >
            Extracurricular<span>Activities</span> {user.firstName}
          </Typography>
          <Button onClick={onLogOut} sx={{ color: "green" }}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
