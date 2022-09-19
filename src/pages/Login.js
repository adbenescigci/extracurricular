import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { mocUsersList } from "../consts/mocUsersList";
import { login } from "../providers/Redux/slices/authSlice";

const Login = () => {
  const user = useSelector((state) => state.auth.user);
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  if (user) {
    return <Navigate to="/programs" replace />;
  }

  const onLogIn = () => {
    if (id) {
      fetch(`http://localhost:5000/users/${id}`)
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
    <Grid
      sx={{
        width: "40%",
        margin: "auto",
        paddingTop: "10%",
        "&>*": {
          marginTop: "5px",
          float: "right",
        },
      }}
      item
      container
      spacing={1}
      align="center"
    >
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            labelId="fake-users-select-label"
            id="demo-users-select"
            value={id}
            label="Users"
            onChange={onChange}
          >
            {mocUsersList.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {" "}
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={onLogIn}
          variant="contained"
          sx={{ justifyContent: "center", width: "50%" }}
        >
          LogIn
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
