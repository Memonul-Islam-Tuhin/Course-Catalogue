import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import { logoutUser } from "./authSlice";

const token = (getState) => getState().auth.token;

export const fetchEnrollments = createAsyncThunk("enrollments/fetch", async (_, { getState, rejectWithValue }) => {
  try {
    const { data } = await api("/enrollments", { token: token(getState) });
    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const enrollCourse = createAsyncThunk("enrollments/enroll", async (slug, { getState, rejectWithValue }) => {
  try {
    const { data } = await api("/enrollments", {
      method: "POST",
      token: token(getState),
      body: { data: { courseSlug: slug } },
    });
    return data;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

// Optimistic update: the tick is applied in `pending`, saved to Strapi, and reverted if it fails.
export const toggleLesson = createAsyncThunk("enrollments/toggle", async ({ slug }, { getState, rejectWithValue }) => {
  const enrollment = getState().enrollments.items.find((i) => i.courseSlug === slug);
  try {
    await api(`/enrollments/${enrollment.documentId}`, {
      method: "PUT",
      token: token(getState),
      body: { data: { completed: enrollment.completed } },
    });
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const flip = (state, { slug, key }) => {
  const e = state.items.find((i) => i.courseSlug === slug);
  if (!e) return;
  const i = e.completed.indexOf(key);
  if (i > -1) e.completed.splice(i, 1);
  else e.completed.push(key);
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => { state.status = "loading"; })
      .addCase(fetchEnrollments.fulfilled, (state, action) => { state.status = "succeeded"; state.items = action.payload; })
      .addCase(fetchEnrollments.rejected, (state) => { state.status = "failed"; })
      .addCase(enrollCourse.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(toggleLesson.pending, (state, action) => flip(state, action.meta.arg))
      .addCase(toggleLesson.rejected, (state, action) => flip(state, action.meta.arg))
      .addCase(logoutUser.fulfilled, (state) => { state.items = []; state.status = "idle"; });
  },
});

export const selectEnrollment = (state, slug) => state.enrollments.items.find((i) => i.courseSlug === slug);

export default enrollmentsSlice.reducer;
