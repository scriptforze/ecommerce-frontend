import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialAuthState } from "./constants";
import { AuthStatuses, InitialAuthState } from "./types";

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, { payload }) => {
      state.status = AuthStatuses.authenticated;
      state.token = payload.token;
      state.errorMessage = null;
    },
    logout: (state, { payload }: PayloadAction<InitialAuthState>) => {
      state.status = AuthStatuses.notAuthenticated;
      state.token = null;
      state.errorMessage = payload;
    },
    checkingCredentials: (state) => {
      state.status = AuthStatuses.checking;
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;
