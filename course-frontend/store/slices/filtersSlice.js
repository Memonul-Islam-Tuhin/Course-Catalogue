import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { search: "", category: "", sort: "new" },
  reducers: {
    setSearch: (state, action) => { state.search = action.payload; },
    setCategory: (state, action) => { state.category = action.payload; },
    setSort: (state, action) => { state.sort = action.payload; },
  },
});

export const { setSearch, setCategory, setSort } = filtersSlice.actions;
export default filtersSlice.reducer;
