import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { login } from "../providers/Redux/slices/authSlice";

const Login = () => {
  const user = useSelector((state) => state.auth.user);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  if (user) {
    return <Navigate to="/programs" replace />;
  }

  const onLogIn = async () => {
    if (id) {
      await fetch(`http://localhost:5000/users/${id}`)
        .then((response) => response.json())
        .then((json) => {
          dispatch(login(json));
        })
        .catch(() => console.log("error"));
    }
  };

  const onChange = (event) => {
    setId(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "40%",
        margin: "auto",
        paddingTop: "10%",
        "&>*": {
          marginTop: "5px",
          float: "right",
        },
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="fake-users-select-label"
          id="demo-users-select"
          value={id}
          label="Users"
          onChange={onChange}
        >
          <MenuItem value={"6327556f38be9040bb71be48"}>Admin</MenuItem>
          <MenuItem value={"6327555938be9040bb71be42"}>Teacher 1</MenuItem>
          <MenuItem value={"6327556038be9040bb71be44"}>Teacher 2</MenuItem>
          <MenuItem value={"6327556438be9040bb71be46"}>Teacher 3</MenuItem>
          <MenuItem value={"6327551238be9040bb71be3c"}>El Std 1</MenuItem>
          <MenuItem value={"6327551638be9040bb71be3e"}>El Std 2</MenuItem>
          <MenuItem value={"6327551a38be9040bb71be40"}>El Std 3</MenuItem>
          <MenuItem value={"632754f738be9040bb71be36"}>Mid Std 1 </MenuItem>
          <MenuItem value={"632754fb38be9040bb71be38"}>Mid Std 2</MenuItem>
          <MenuItem value={"632754ff38be9040bb71be3a"}>Mid Std 3</MenuItem>
          <MenuItem value={"632754d938be9040bb71be30"}>High Std 1 </MenuItem>
          <MenuItem value={"632754e438be9040bb71be32"}>High Std 2</MenuItem>
          <MenuItem value={"632754e838be9040bb71be34"}>High Std 3</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={onLogIn}
        variant="contained"
        sx={{ justifyContent: "end" }}
      >
        LogIn
      </Button>
    </Box>
  );
};

export default Login;
