import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import courses from "./slices/coursesSlice";
import filters from "./slices/filtersSlice";
import enrollments from "./slices/enrollmentsSlice";
import ui from "./slices/uiSlice";

export const makeStore = () =>
  configureStore({ reducer: { auth, courses, filters, enrollments, ui } });
