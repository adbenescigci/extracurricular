import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "",
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = "";
    },
    deleteOne: (state, action) => {
      state.user.programs = state.user.programs.filter(
        (el) => el.id !== action.payload
      );
    },
  },
});

export const { login, logout, deleteOne } = authSlice.actions;

export default authSlice.reducer;
