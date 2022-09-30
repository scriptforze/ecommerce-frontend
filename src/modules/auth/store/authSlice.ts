import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAuthState } from "./constants";
import { AuthStatuses, InitialAuthState } from "./types";

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, { payload }: PayloadAction<InitialAuthState>) => {
      state.status = AuthStatuses.authenticated;
      state.token = payload.token;
    },
    logout: (state) => {
      state.status = AuthStatuses.notAuthenticated;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
