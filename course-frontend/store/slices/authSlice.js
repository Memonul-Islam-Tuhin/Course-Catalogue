import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/lib/api";

const KEY = "lh_jwt";
const save = (t) => { try { localStorage.setItem(KEY, t); } catch {} };
const load = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const clear = () => { try { localStorage.removeItem(KEY); } catch {} };

export const hydrateAuth = createAsyncThunk("auth/hydrate", async (_, { rejectWithValue }) => {
  const token = load();
  if (!token) return rejectWithValue(null);
  try {
    const user = await api("/users/me", { token });
    return { user, token };
  } catch {
    clear();
    return rejectWithValue(null);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (body, { rejectWithValue }) => {
  try {
    const { jwt, user } = await api("/auth/local", { method: "POST", body });
    save(jwt);
    return { user, token: jwt };
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const registerUser = createAsyncThunk("auth/register", async (body, { rejectWithValue }) => {
  try {
    const { jwt, user } = await api("/auth/local/register", { method: "POST", body });
    save(jwt);
    return { user, token: jwt };
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => { clear(); });

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, ready: false, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    const signedIn = (state, action) => {
      state.status = "idle";
      state.user = action.payload.user;
      state.token = action.payload.token;
    };
    builder
      .addCase(hydrateAuth.fulfilled, (state, action) => { signedIn(state, action); state.ready = true; })
      .addCase(hydrateAuth.rejected, (state) => { state.ready = true; })
      .addCase(loginUser.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(registerUser.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(loginUser.fulfilled, signedIn)
      .addCase(registerUser.fulfilled, signedIn)
      .addCase(loginUser.rejected, (state, action) => { state.status = "idle"; state.error = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.status = "idle"; state.error = action.payload; })
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; state.token = null; });
  },
});

export default authSlice.reducer;
