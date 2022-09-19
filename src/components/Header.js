import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";

import { logout } from "../providers/Redux/slices/authSlice";
import { stylesHeader } from "./styles";

const Header = ({ user }) => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logout());
  };

  const onHandleClick = () => {
    console.log("handle");
  };

  return (
    <Box sx={stylesHeader.box}>
      <Grid sx={stylesHeader.grid} alignItems="center" spacing={1} container>
        <Grid item xs={7}>
          <Typography variant="h4" component="h2">
            Extracurricular
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Chip label={user?.firstName} onClick={onHandleClick} />
        </Grid>
        <Grid item xs={3}>
          <Button onClick={onLogOut}>LogOut</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
