import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJob: (state, action) => {
      (state.loading = false),
        (state.error = null),
        (state.job = action.payload);
    },
    clearJob: (state) => {
      (state.loading = false), (state.error = null), (state.job = null);
    },
  },
});

export const { clearJob } = jobSlice.actions;

export default jobSlice.reducer;
