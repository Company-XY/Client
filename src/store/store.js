import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import jobSlice from "./Slices/jobSlice";
import darkModeReducer from "./Slices/darkMode";

export default configureStore({
  reducer: {
    user: userReducer,
    job: jobSlice,
    darkMode: darkModeReducer,
  },
});
