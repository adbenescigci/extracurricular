import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import Navbar from "../components/Navbar.js";

const MainPage = () => {
  let location = useLocation();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  const appStyles = {
    wrapper: {
      display: "flex",
      minHeight: "100vh",
      flexDirection: { xs: "column", sm: "row", ms: "row" },
      backgroundColor: "#f5f5f5",
    },
    row: {
      width: "100%",
      height: "100%",
      backgroundColor: "#f5f5f5",
    },
  };

  return (
    <Box sx={appStyles.wrapper}>
      <Navbar />
      <Box sx={appStyles.row}>
        <Header user={user} />
        <Outlet context={user} />
      </Box>
    </Box>
  );
};

export default MainPage;
