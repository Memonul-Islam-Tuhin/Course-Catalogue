"use client";

import { useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { makeStore } from "./index";
import { hydrateAuth } from "./slices/authSlice";
import { fetchCourses } from "./slices/coursesSlice";
import { fetchEnrollments } from "./slices/enrollmentsSlice";

// Loads the session, the courses and the user's enrollments once the app mounts.
function Bootstrap() {
  const dispatch = useDispatch();
  const userId = useSelector((s) => s.auth.user?.id);

  useEffect(() => {
    dispatch(hydrateAuth());
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (userId) dispatch(fetchEnrollments());
  }, [userId, dispatch]);

  return null;
}

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) storeRef.current = makeStore();

  return (
    <Provider store={storeRef.current}>
      <Bootstrap />
      {children}
    </Provider>
  );
}
