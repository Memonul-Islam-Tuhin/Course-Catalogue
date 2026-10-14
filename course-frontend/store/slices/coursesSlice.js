import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

export const fetchCourses = createAsyncThunk("courses/fetch", async (_, { rejectWithValue }) => {
  try {
    const [courses, categories] = await Promise.all([
      api("/courses?populate=category&sort=createdAt:desc&pagination[pageSize]=100"),
      api("/categories?sort=createdAt:asc&pagination[pageSize]=100"),
    ]);
    return {
      items: courses.data.map((c) => ({
        ...c,
        price: Number(c.price) || 0,
        rating: Number(c.rating) || 0,
        modules: Array.isArray(c.modules) ? c.modules : [],
      })),
      categories: categories.data,
    };
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const coursesSlice = createSlice({
  name: "courses",
  initialState: { items: [], categories: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.categories = action.payload.categories;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Could not load courses.";
      });
  },
});

const sorters = {
  rt: (a, b) => b.rating - a.rating,
  pl: (a, b) => a.price - b.price,
  ph: (a, b) => b.price - a.price,
};

export const selectVisibleCourses = createSelector(
  [(s) => s.courses.items, (s) => s.filters],
  (items, { search, category, sort }) => {
    const q = search.trim().toLowerCase();
    const list = items.filter(
      (c) =>
        (!category || c.category?.name === category) &&
        (!q || c.title.toLowerCase().includes(q) || (c.instructor || "").toLowerCase().includes(q))
    );
    return sorters[sort] ? [...list].sort(sorters[sort]) : list;
  }
);

export default coursesSlice.reducer;
