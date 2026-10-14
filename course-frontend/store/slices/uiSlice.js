import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

const makeToast = (message) => ({ message, id: Date.now() });

export const subscribe = createAsyncThunk("ui/subscribe", async (email, { rejectWithValue }) => {
  try {
    await api("/subscribers", { method: "POST", body: { data: { email } } });
  } catch (e) {
    if (!/unique/i.test(e.message)) return rejectWithValue(e.message); // already subscribed = success
  }
});

const uiSlice = createSlice({
  name: "ui",
  initialState: { toast: null },
  reducers: {
    showToast: {
      reducer(state, action) { state.toast = action.payload; },
      prepare: (message) => ({ payload: makeToast(message) }),
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribe.fulfilled, (state) => { state.toast = makeToast("Subscribed! Thank you 💌"); })
      .addCase(subscribe.rejected, (state, action) => { state.toast = makeToast(action.payload || "Could not subscribe."); });
  },
});

export const { showToast } = uiSlice.actions;
export default uiSlice.reducer;
