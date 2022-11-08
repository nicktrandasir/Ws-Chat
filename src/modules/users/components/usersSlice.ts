import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../../../api/users";
import { IUser } from "./IUser";

interface IUsersSlice {
  error?: Error;
  users?: IUser[];
}

export const usersInitialState: IUsersSlice = {
  error: undefined,
  users: [],
};

export const { actions: usersAction, reducer: usersReducer } = createSlice({
  name: "usersData",
  initialState: usersInitialState,
  reducers: {
    clearAuthData: () => usersInitialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(usersApi.endpoints.getListUsers.matchFulfilled, (state, { payload }) => {
      state.users = payload;
    });
    builder.addMatcher(usersApi.endpoints.addUser.matchFulfilled, (state, { payload }) => {
      //  state.users = payload;
    });
  },
});
