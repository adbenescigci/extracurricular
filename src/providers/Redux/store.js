import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import programReducer from "./slices/programSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    program: programReducer,
  },
});
