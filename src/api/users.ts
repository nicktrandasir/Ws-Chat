import { rtkApi } from "./baseApi";

export const usersApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getListUsers: build.query({
      query: () => ({ url: "/users" }),
      providesTags: ["Users"],
    }),
    addUser: build.mutation({
      query: (data) => {
        return {
          url: "/users",
          method: "post",
          data,
        };
      },
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetListUsersQuery, useAddUserMutation } = usersApi;
