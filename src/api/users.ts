import { rtkApi } from "./baseApi";

//Добавление тега для автообновления
const apiWithTag = rtkApi.enhanceEndpoints({ addTagTypes: ["Users"] });

export const usersApi = apiWithTag.injectEndpoints({
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
