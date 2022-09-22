import { createSlice } from "@reduxjs/toolkit";

export const programSlice = createSlice({
  name: "program",
  initialState: {
    programs: [],
  },
  reducers: {
    fetchData: (state, action) => {
      state.programs = action.payload.programs;
    },
    addOne: (state, action) => {
      state.programs = [action.payload, ...state.programs];
    },

    updateOne: (state, { payload }) => {
      state.programs[payload.index].students = payload.students;
    },

    deleteOne: (state, action) => {
      state.programs = state.programs.filter((el) => el.id !== action.payload);
    },
  },
});

export const { fetchData, deleteOne, addOne, updateOne } = programSlice.actions;

export default programSlice.reducer;
