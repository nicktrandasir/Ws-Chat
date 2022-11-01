import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rtkApi } from "../api/baseApi";
import { usersReducer } from "../modules/users/components/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const isDev = process.env.NODE_ENV === "development";

const reducer = persistCombineReducers(
  {
    key: "root",
    storage,
    whitelist: ["auth"],
    debug: isDev,
  },
  {
    [rtkApi.reducerPath]: rtkApi.reducer,
    users: usersReducer,
  }
);

export type StateType = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ["persist/PERSIST"] },
    }).concat(rtkApi.middleware),
  devTools: isDev,
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
