import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@/modules/auth";
import { ecommerceApi } from "./ecommerceApi";
import { productSlice } from "@/modules/products";

export const store = configureStore({
  reducer: {
    [ecommerceApi.reducerPath]: ecommerceApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [productSlice.name]: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ecommerceApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
