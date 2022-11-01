import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../../../api/users";
import { IUser } from "../interfaces/IUser";

interface IUsersSlice {
  isLoading: boolean;
  error?: any;
  users?: IUser[];
}

export const usersInitialState: IUsersSlice = {
  isLoading: false,
  error: undefined,
  users: [],
};

export const { actions: usersAction, reducer: usersReducer } = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    clearUsers: () => usersInitialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(usersApi.endpoints.getListUsers.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(usersApi.endpoints.getListUsers.matchFulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    });
    builder.addMatcher(usersApi.endpoints.getListUsers.matchRejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  },
});
