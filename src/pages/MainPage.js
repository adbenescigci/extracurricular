import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import BoxWrapper from "../common/BoxWrapper";
import Header from "../components/Header";

const styles = {
  boxContainer: {
    backgroundColor: "white",
    minHeight: "calc(100vh )",
    borderTop: 4,
    borderColor: "#A2DA4A",
  },
  outlet: {
    minHeight: "calc(100vh)",
    backgroundColor: "#f5f5f5",
  },
};

const MainPage = () => {
  let location = useLocation();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <BoxWrapper>
      <Box sx={styles.boxContainer}>
        <Header user={user} />
        <Box sx={styles.outlet}>
          <Outlet />
        </Box>
      </Box>
    </BoxWrapper>
  );
};

export default MainPage;
