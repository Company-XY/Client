import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      (state.loading = false),
        (state.error = null),
        (state.user = action.payload),
        localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      (state.loading = false),
        (state.error = null),
        (state.user = null),
        localStorage.removeItem("user");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
