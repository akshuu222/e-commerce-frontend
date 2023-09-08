import { api } from "./apiSlice";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (form) => ({
        url: "/login",
        method: "POST",
        body: form,
      }),
    }),
    register: builder.mutation({
      query: (form) => ({
        url: "/register",
        method: "POST",
        body: form,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (form) => ({
        url: "/profile/update",
        method: "PUT",
        body: form,
      }),
    }),
    updatePassword: builder.mutation({
      query: (form) => ({
        url: "/password/update",
        method: "PUT",
        body: form,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation 
} = userApi;
