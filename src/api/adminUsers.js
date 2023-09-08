import { api } from "./apiSlice";

export const adminUsers = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.users.map(({ _id }) => ({
                type: "Users",
                id: _id,
              })),
              { type: "Users", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Poducts', id: 'LIST' }` is invalidated
            [{ type: "Users", id: "LIST" }],
    }),
    updateAdminUser: builder.mutation({
      query: ({ id, myForm }) => {
        return {
          url: `/admin/user/${id}`,
          method: "PUT",
          body: myForm,
        };
      },
      invalidatesTags: (result, error, { id }) => {
        return [{ type: "Users", id }];
      },
    }),
    deleteuser: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/user/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => {
        return [{ type: "Users", id }];
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteuserMutation,
  useUpdateAdminUserMutation,
} = adminUsers;
