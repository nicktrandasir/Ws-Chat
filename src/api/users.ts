import { rtkApi } from "./baseApi";

export const usersApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getListUsers: build.query({
      query: (page) => ({ url: `https://jsonplaceholder.typicode.com/users?page=${page}` }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetListUsersQuery } = usersApi;
