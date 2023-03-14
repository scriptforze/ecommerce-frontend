import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialProductState } from "./constants";
import { InitialProductState } from "./types";

export const productSlice = createSlice({
  name: "products",
  initialState: initialProductState,
  reducers: {
    setProduct: (state, { payload }: PayloadAction<InitialProductState>) => {
      state.product = payload.product;
    },
    reset: (state) => {
      state.product = null;
    },
  },
});

export const { setProduct, reset } = productSlice.actions;
