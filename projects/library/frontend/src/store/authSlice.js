import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  sessionId: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { name, email, sessionId } = action.payload;
      state.user = { name, email };
      state.isAuthenticated = true;
      state.sessionId = sessionId;
    },
    logout: (state) => {
      state.user = null;
      state.sessionId = "";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
