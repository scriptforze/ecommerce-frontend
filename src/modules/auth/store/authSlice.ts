import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearLocalStorage } from "@/modules/common/helpers";
import { initialAuthState, TOKEN_KEY } from "./constants";
import { AuthStatuses, InitialAuthState } from "./types";

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, { payload }: PayloadAction<InitialAuthState>) => {
      state.status = AuthStatuses.authenticated;
      state.token = payload.token;
      state.user = null;
    },
    setUser: (state, { payload }: PayloadAction<InitialAuthState>) => {
      state.user = payload.user;
    },
    logout: (state) => {
      clearLocalStorage(TOKEN_KEY);
      state.status = AuthStatuses.notAuthenticated;
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, setUser, logout } = authSlice.actions;
