import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api/apiSlice";
import userReducer from "./api/userSlice";
import cartReducer from "./api/cart";
import searchReducer from "./api/searchSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    cart: cartReducer,
    search: searchReducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
