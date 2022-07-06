import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/toDoReducer";

export const store = configureStore({
  reducer: todoReducer,
});