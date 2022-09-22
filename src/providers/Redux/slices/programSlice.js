import { createSlice } from "@reduxjs/toolkit";

export const programSlice = createSlice({
  name: "auth",
  initialState: {
    programs: [],
  },
  reducers: {
    fetchData: (state, action) => {
      console.log(action.payload);
      state.programs = action.payload.programs;
    },
    addOne: (state, action) => {
      state.programs = [action.payload, ...state.programs];
    },
    updateOne: (state, action) => {
      console.log(action.payload);
    },
    deleteOne: (state, action) => {
      state.programs = state.programs.filter((el) => el.id !== action.payload);
    },
  },
});

export const { fetchData, deleteOne, addOne, updateOne } = programSlice.actions;

export default programSlice.reducer;
