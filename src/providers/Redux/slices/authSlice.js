import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
